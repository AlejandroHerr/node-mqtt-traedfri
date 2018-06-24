import { Action, Dispatch, Store } from 'redux';
import { MqttClient } from 'mqtt';

import logger from '../../../services/logger';

import {
  AddSubscriberAction,
  RemoveSubscriberAction,
  addedSubscriber,
  clientError,
  removedSubscriber,
  PublishAction,
} from './actions';
import { ADD_SUBSCRIBER, REMOVE_SUBSCRIBER, PUBLISH } from './actionTypes';
import { asyncSubscribe, asyncUnsubscribe, asyncPublish } from './helpers';

const isAddSubscriberAction = (action: Action): action is AddSubscriberAction => action.type === ADD_SUBSCRIBER;
const isRemoveSubscriberAction = (action: Action): action is RemoveSubscriberAction =>
  action.type === REMOVE_SUBSCRIBER;
const isPublishAction = (action: Action): action is PublishAction =>
  action.type === PUBLISH;


const handleAddSubscriberAction = async (
  client: MqttClient,
  { dispatch }: Store,
  next: Dispatch,
  action: AddSubscriberAction,
) => {
  logger.debug('Handling addSubscriber');
  const { topic, options, callback } = action.payload;
  const { successCallback, failureCallback } = action.meta;

  const result = await asyncSubscribe(client, topic, options);

  if (result instanceof Error) {
    if (failureCallback) {
      dispatch(failureCallback(result, topic));
    }

    return next(clientError(result));
  }

  if (successCallback) {
    dispatch(successCallback(result, topic));
  }
  logger.debug(result);
  return next(addedSubscriber({ topic, options, callback }));
};

const handleRemoveSubscriberAction = async (
  client: MqttClient,
  { dispatch }: Store,
  next: Dispatch,
  action: RemoveSubscriberAction,
) => {
  logger.debug('is remove subscriber');
  const { topic } = action.payload;
  const { successCallback, failureCallback } = action.meta;

  const result = await asyncUnsubscribe(client, topic);

  if (result instanceof Error) {
    if (failureCallback) {
      dispatch(failureCallback(result, topic));
    }

    return next(clientError(result));
  }

  if (successCallback) {
    dispatch(successCallback(result, topic));
  }

  return next(removedSubscriber({ topic }));
};

const handlePublishAction = async (
  client: MqttClient,
  { dispatch }: Store,
  next: Dispatch,
  action: PublishAction,
) => {
  logger.debug('is publish');
  const { topic, message, options } = action.payload;
  const { successCallback, failureCallback } = action.meta;

  const result = await asyncPublish(client, topic, message, options);

  if (result instanceof Error) {
    if (failureCallback) {
      dispatch(failureCallback(result, topic));
    }

    return next(action);
  }

  if (successCallback) {
    dispatch(successCallback(result, topic));
  }

  return next(action);
};

const mqttHandler = (
  client: MqttClient,
  store: Store,
  next: Dispatch,
  action: Action,
) => {
  if (isAddSubscriberAction(action)) {
    return handleAddSubscriberAction(client, store, next, action);
  }

  if (isRemoveSubscriberAction(action)) {
    return handleRemoveSubscriberAction(client, store, next, action);
  }

  if (isPublishAction(action)) {
    return handlePublishAction(client, store, next, action);
  }

  return next(action);
};

export default mqttHandler;
