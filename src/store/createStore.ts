import { createStore, applyMiddleware } from 'redux';

import reduxLogger from './middlewares/redux-logger';
import mqttMiddleware from './middlewares/redux-mqtt/middleware';
import traedfriMiddleware from './middlewares/redux-traedfri/middleware';

import rootReducer from './rootReducer';

export default () => createStore(
  rootReducer,
  applyMiddleware(
    reduxLogger,
    // traedfriMiddleware,
    mqttMiddleware(),
  ),
);
