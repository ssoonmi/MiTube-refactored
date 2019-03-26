import { LOGIN, LOGOUT } from '../../actions/session_actions';

const defaultState = {
  id: null,
};

export default function SessionReducer(state=defaultState, action) {
  Object.freeze(state);
  switch (action.type) {
    case LOGIN:
      return { id: action.id };
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
}