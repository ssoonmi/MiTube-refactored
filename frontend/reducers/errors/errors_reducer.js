import { combineReducers } from 'redux';
import channelForm from './channel_form_errors_reducer';
import videoForm from './video_form_errors_reducer';

export default combineReducers({
  channelForm,
  videoForm
});