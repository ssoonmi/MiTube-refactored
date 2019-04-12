import { 
  RECEIVE_VIDEO_FORM_ERRORS,
  RECEIVE_CREATE_VIDEO } from '../../actions/video_actions';

const defaultState = {};

function videoFormErrorsReducer(state=defaultState, action) {
  switch (action.type) {
    case RECEIVE_VIDEO_FORM_ERRORS:
      return action.response;
    case RECEIVE_CREATE_VIDEO:
      return defaultState;
    default:
      return state;
  }
}

export default videoFormErrorsReducer;