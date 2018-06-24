import { Action } from 'redux';
import { handleActions } from 'redux-actions';

import {
  CLIENT_CONNECTED,
  CLIENT_ERROR,
  ADDED_SUBSCRIBER,
  REMOVED_SUBSCRIBER,
} from './actionTypes';
import { ClientErrorAction, AddedSubscriberAction, RemovedSubscriberAction } from './actions';
import { SubscribeTopic, MessageCallback } from './types';

export type ReduxMqttState = {
  connected: boolean,
  error: Error,
  subscribers: Array<{
    topic: SubscribeTopic,
    callback: MessageCallback,
  }>
};

const initialState: ReduxMqttState = {
  connected: false,
  error: null,
  subscribers: [],
};

const reduxMqttReducer = handleActions({
  [CLIENT_CONNECTED]: (state: ReduxMqttState) => ({
    ...state,
    connected: true,
  }),
  [CLIENT_ERROR]: (state: ReduxMqttState, action: Action) => ({
    ...state,
    error: (<ClientErrorAction>action).payload,
  }),
  [ADDED_SUBSCRIBER]: (state: ReduxMqttState, action: Action) => ({
    ...state,
    subscribers: state.subscribers.concat((<AddedSubscriberAction>action).payload),
  }),
  [REMOVED_SUBSCRIBER]: (state: ReduxMqttState, action: Action) => {
    const { topic } = (<RemovedSubscriberAction>action).payload;

    return {
      ...state,
      subscribers: state.subscribers.filter(subscriber => subscriber.topic !== topic),
    };
  },
}, initialState);

export default reduxMqttReducer;
