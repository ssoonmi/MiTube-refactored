import { combineReducers } from 'redux';
import session from './session/session_reducer';
import entities from './entities/entities_reducer';
import theme from './theme/theme_reducer';
import errors from './errors/errors_reducer';
import ui from './ui/ui_reducer';

export default combineReducers({
  entities,
  session,
  theme,
  errors,
  ui
});