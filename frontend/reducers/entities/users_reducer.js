import { LOGIN, LOGOUT } from '../../actions/session_actions';
import { RECEIVE_OWN_CHANNEL, RECEIVE_USER_CHANNELS } from '../../actions/channel_actions';
import { RECEIVE_USER } from '../../actions/user_actions';
import {
  RECEIVE_COMMENT,
  RECEIVE_COMMENTS
} from '../../actions/comment_actions';

const defaultState = {};

export default function UsersReducer(state=defaultState, action) {
  let newState;
  let channelIds;
  switch (action.type) {
    case RECEIVE_COMMENT:
    case RECEIVE_COMMENTS:
      return Object.assign({}, state, action.users);
    case RECEIVE_USER: 
      newState = Object.assign({}, state);
      newState[action.user.id] = action.user;
      return newState;
    case RECEIVE_OWN_CHANNEL:
    case RECEIVE_USER_CHANNELS:
      newState = Object.assign({}, state);
      action.payload.channels.forEach((channel) => {
        channelIds = newState[channel.user_id].channelIds || new Set();
        channelIds.add(channel.id);
        newState[channel.user_id].channelIds = channelIds;
      });
      return newState;
    case LOGIN:
      newState = Object.assign({}, state);
      newState[action.id] = action.user;
      return newState;
    case LOGOUT:
      newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
}