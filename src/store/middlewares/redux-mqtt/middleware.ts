import { Action, Dispatch, Middleware, Store } from 'redux';
import { IClientOptions, MqttClient, Packet } from 'mqtt';
import mqttMatch from 'mqtt-match';

import { AddSubscriberAction, RemoveSubscriberAction, clientError, clientConnected } from './actions';
import { PREFIX, ACTIONABLE, ADD_SUBSCRIBER, REMOVE_SUBSCRIBER } from './actionTypes';
import initMqtt from './initMqtt';
import logger from '../../../services/logger';
import { asyncSubscribe, asyncUnsubscribe } from './helpers';
import mqttHandler from './mqttHandler';
import { ReduxMqttState } from './reducer';

const isMqttActionable = (action: Action) => new RegExp(`^${PREFIX}${ACTIONABLE}`).test(action.type);

const reduxMqttMiddleware = (clientOptions: IClientOptions = {}): Middleware =>
  (store: Store<{reduxMqtt: ReduxMqttState}>) => {
    const client = initMqtt(clientOptions);

    client.on('connect', () => {
      const { dispatch } = store;
      dispatch(clientConnected());
    });
    client.on('error', (error) => {
      const { dispatch } = store;
      dispatch(clientError(error));
    });

    //
    // (method) MqttClient.publish(
    //  topic: string,
    //  message: string | Buffer,
    //  opts: IClientPublishOptions,
    //  callback?: PacketCallback): MqttClient (+1 overload)
    // client.()
    // client.publ
    client.on('message', (topic: string, message: Buffer, packet: Packet) => {
      const { dispatch, getState } = store;
      const { reduxMqtt } = getState();

      reduxMqtt.subscribers
        .filter((subscriber) => {
          if (Array.isArray(subscriber.topic)) {
            return subscriber.topic.some(subTopic => mqttMatch(subTopic, topic));
          }

          return mqttMatch(subscriber.topic, topic);
        })
        .forEach((subscriber) => {
          dispatch(subscriber.callback(topic, message, packet));
        });
    });

    return (next: Dispatch) => (action: Action) => {
      if (!isMqttActionable(action)) {
        return next(action);
      }

      return mqttHandler(client, store, next, action);
    };
  };

export default reduxMqttMiddleware;
