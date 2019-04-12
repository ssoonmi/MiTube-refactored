import { combineReducers } from 'redux';
import users from './users_reducer.js';
import channels from './channels_reducer';
import videos from './videos_reducer';
import comments from './comments_reducer';

export default combineReducers({
  users,
  channels,
  videos,
  comments,
});