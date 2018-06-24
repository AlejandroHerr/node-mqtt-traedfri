import {
  createAction,
  Action,
  ActionMeta,
} from 'redux-actions';

import {
  CLIENT_CONNECTED,
  CLIENT_ERROR,
  ADD_SUBSCRIBER,
  REMOVE_SUBSCRIBER,
  ADDED_SUBSCRIBER,
  REMOVED_SUBSCRIBER,
  PUBLISH,
} from './actionTypes';
import {
  IAddSubscribePayload,
  IRemoveSubscribeMeta,
  SubscribeTopic,
  MessageCallback,
  IAddSubscribeMeta,
  IRemoveSubscribePayload,
  IPublishPayload,
  IPublishMeta,
} from './types';

export type ClientConnectedAction = Action<null>;
export type ClientErrorAction = Action<Error>;

export const clientConnected: () => ClientConnectedAction = createAction(CLIENT_CONNECTED);
export const clientError: (error: Error) => ClientErrorAction = createAction(
  CLIENT_ERROR,
  (error: Error) => error,
);

export type AddSubscriberAction = ActionMeta<IAddSubscribePayload, IAddSubscribeMeta>;
export const addSubscriber: (options: IAddSubscribePayload & IAddSubscribeMeta) => AddSubscriberAction = createAction(
  ADD_SUBSCRIBER,
  ({ topic, options, callback }: IAddSubscribePayload) => ({
    topic,
    options: {
      qos: 1,
      ...options,
    },
    callback,
  }),
  ({ successCallback, failureCallback }: IAddSubscribeMeta) => ({
    successCallback,
    failureCallback,
  }),
);

export type AddedSubscriberAction = Action<IAddSubscribePayload>;
export const addedSubscriber: (options: IAddSubscribePayload) => AddedSubscriberAction = createAction(
  ADDED_SUBSCRIBER,
  ({ topic, options, callback }: IAddSubscribePayload) => ({ topic, options, callback }),
);

export type RemoveSubscriberAction = ActionMeta<IRemoveSubscribePayload, IRemoveSubscribeMeta>;
type RemoveSubscriberActionCreator = (
  options: IRemoveSubscribePayload & IRemoveSubscribeMeta
) => RemoveSubscriberAction;
export const removeSubscriber: RemoveSubscriberActionCreator = createAction(
  REMOVE_SUBSCRIBER,
  ({ topic }: IRemoveSubscribePayload) => ({ topic }),
  ({ successCallback, failureCallback }: IRemoveSubscribeMeta) => ({
    successCallback,
    failureCallback,
  }),
);


export type RemovedSubscriberAction = Action<IRemoveSubscribePayload>;

type RemovedSubscriberActionCreator = (options: IRemoveSubscribePayload) => RemovedSubscriberAction;

export const removedSubscriber: RemovedSubscriberActionCreator = createAction(
  REMOVED_SUBSCRIBER,
  ({ topic }: IRemoveSubscribePayload) => ({ topic }),
);


export type PublishAction = ActionMeta<IPublishPayload, IPublishMeta>;

type PublishActionCreator = (data: IPublishPayload & IPublishMeta) => PublishAction;

export const publish: PublishActionCreator = createAction(
  PUBLISH,
  ({ topic, message, options }: IPublishPayload) => ({
    topic,
    message,
    options: {
      qos: 0,
      retain: true,
      duplicate: false,
      ...options,
    },
  }),
  ({ successCallback, failureCallback }: IPublishMeta) => ({
    successCallback,
    failureCallback,
  }),
);
