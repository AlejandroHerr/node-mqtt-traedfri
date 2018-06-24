import { Action, Dispatch, Middleware, Store } from 'redux';

import connectTraedfri from './connectTraedfri';

const traedfriMiddleware: Middleware = (store: Store) => {
  connectTraedfri(store);

  return (next: Dispatch) => (action: Action) => next(action);
};

export default traedfriMiddleware;
