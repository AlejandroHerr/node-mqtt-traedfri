import { Action } from 'redux';
import { handleActions } from 'redux-actions';
import { DiscoveredGateway, Accessory } from 'node-tradfri-client';

import { GatewayDiscoveredAction, SetCredentialsAction, UpdateLightBulbAction, RemoveLightBulbAction } from './actions';
import { GATEWAY_DISCOVERED, SET_CREDENTIALS, CONNECTED, UPDATE_LIGHT_BULB, REMOVE_LIGHT_BULB } from './actionTypes';
import { Credentials } from './types';

export type ReduxTraedfriState = {
  connected: boolean,
  gateway: DiscoveredGateway,
  credentials: Credentials,
  lightBulbs: Array<Accessory>
};

const initialState: ReduxTraedfriState = {
  connected: false,
  gateway: null,
  credentials: null,
  lightBulbs: [],
};

const updateLightBulbState = (lightBulbs: Array<Accessory>, lightBulb: Accessory) => {
  const instanceIndex = lightBulbs
    .findIndex(({ instanceId }) => instanceId === lightBulb.instanceId);

  return instanceIndex === -1
    ? [lightBulb].concat(lightBulbs)
    : [
      ...lightBulbs.slice(0, instanceIndex),
      lightBulb,
      ...lightBulbs.slice(instanceIndex + 1),
    ];
};

const reduxTraedfriReducer = handleActions({
  [GATEWAY_DISCOVERED]: (state: ReduxTraedfriState, action: Action) => ({
    ...state,
    gateway: (<GatewayDiscoveredAction>action).payload || null,
  }),
  [SET_CREDENTIALS]: (state: ReduxTraedfriState, action: Action) => ({
    ...state,
    credentials: (<SetCredentialsAction>action).payload || null,
  }),
  [CONNECTED]: (state: ReduxTraedfriState) => ({
    ...state,
    connected: true,
  }),
  [UPDATE_LIGHT_BULB]: (state: ReduxTraedfriState, action: Action) => {
    const { payload: lightBulb } = (<UpdateLightBulbAction>action);

    return !lightBulb
      ? state
      : {
        ...state,
        lightBulbs: updateLightBulbState(state.lightBulbs, lightBulb),
      };
  },
  [REMOVE_LIGHT_BULB]: (state: ReduxTraedfriState, action: Action) => {
    const { payload: instanceId } = (<RemoveLightBulbAction>action);

    return !instanceId
      ? state
      : {
        ...state,
        lightBulbs: state.lightBulbs.filter(lightBulb => lightBulb.instanceId !== instanceId),
      };
  },
}, initialState);

export default reduxTraedfriReducer;
