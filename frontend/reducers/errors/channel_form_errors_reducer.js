import { 
  RECEIVE_CHANNEL_FORM_ERRORS,
  RECEIVE_CREATE_CHANNEL } from '../../actions/channel_actions';

const defaultState = {};

function channelFormErrorsReducer(state=defaultState, action) {
  switch (action.type) {
    case RECEIVE_CHANNEL_FORM_ERRORS:
      return action.response;
    case RECEIVE_CREATE_CHANNEL:
      return defaultState;
    default:
      return state;
  }
}

export default channelFormErrorsReducer;