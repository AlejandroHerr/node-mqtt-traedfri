import { combineReducers } from 'redux';

import reduxMqttReducer, { ReduxMqttState } from './middlewares/redux-mqtt/reducer';
import reduxTraedfriReducer, { ReduxTraedfriState } from './middlewares/redux-traedfri/reducer';

export type State = {
  reduxMqtt: ReduxMqttState
  reduxTraedfri: ReduxTraedfriState,
};

const rootReducer = combineReducers({
  reduxMqtt: reduxMqttReducer,
  reduxTraedfri: reduxTraedfriReducer,
});

export default rootReducer;
