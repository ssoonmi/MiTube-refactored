import { combineReducers } from 'redux';
import session from './session/session_reducer';
import entities from './entities/entities_reducer';
import theme from './theme/theme_reducer';

export default combineReducers({
  entities,
  session,
  theme
});