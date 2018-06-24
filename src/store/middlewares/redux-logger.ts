import { Action, Store } from 'redux';
import logger from '../../services/logger';

const reduxLogger = ({ getState }: Store) => next => async (action: Action) => {
  // logger.info({ 'PREV STATE': getState() });
  logger.debug({ ACTION: action });

  const result = await next(action);

  logger.info({ 'NEXT STATE': getState() });

  return result;
};

export default reduxLogger;
