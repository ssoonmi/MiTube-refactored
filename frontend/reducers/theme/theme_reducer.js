import { CHANGE_THEME } from '../../actions/theme_actions';

export default function themeReducer(state=null, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return action.theme;
    default:
      return state;
  }
}