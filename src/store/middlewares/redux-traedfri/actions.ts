import {
  createAction,
  Action,
} from 'redux-actions';
import { DiscoveredGateway, Accessory } from 'node-tradfri-client';

import {
  GATEWAY_DISCOVERED,
  SET_CREDENTIALS,
  CONNECTED,
  UPDATE_LIGHT_BULB,
  REMOVE_LIGHT_BULB,
} from './actionTypes';
import { Credentials } from './types';

export type GatewayDiscoveredAction = Action<DiscoveredGateway>;
export type SetCredentialsAction = Action<Credentials>;
export type ConnectedAction = Action<null>;
export type UpdateLightBulbAction = Action<Accessory>;
export type RemoveLightBulbAction = Action<number>;


export const gatewayDiscovered: (gateway: DiscoveredGateway) => GatewayDiscoveredAction = createAction(
  GATEWAY_DISCOVERED,
  (gateway: DiscoveredGateway = null) => gateway,
);

export const setCredentials: (credentials: Credentials) => SetCredentialsAction = createAction(
  SET_CREDENTIALS,
  (credentials: Credentials = null) => credentials,
);

export const connected: () => ConnectedAction = createAction(CONNECTED);

export const updateLightBulb: (device: Accessory) => UpdateLightBulbAction = createAction(
  UPDATE_LIGHT_BULB,
  (device: Accessory) => device,
);

export const removeLightBulb: (instanceId: number) => RemoveLightBulbAction = createAction(
  REMOVE_LIGHT_BULB,
  (instanceId: number) => instanceId,
);
