import { 
  RECEIVE_OWN_CHANNEL, 
  RECEIVE_CHANNEL, 
  RECEIVE_CREATE_CHANNEL, 
  RECEIVE_CHANNELS, 
  RECEIVE_USER_CHANNELS } from '../../actions/channel_actions';
import { 
  RECEIVE_VIDEO, 
  RECEIVE_CREATE_VIDEO } from '../../actions/video_actions';

const defaultState = {};

function channelsReducer(state=defaultState, action) {
  Object.freeze(state);
  let newState;
  let channels;
  let videoIds;
  switch (action.type) {
    case RECEIVE_OWN_CHANNEL:
    case RECEIVE_VIDEO:
    case RECEIVE_CREATE_VIDEO:
    case RECEIVE_CHANNELS:
    case RECEIVE_CHANNEL:
    case RECEIVE_CREATE_CHANNEL:
    case RECEIVE_USER_CHANNELS:
      channels = {};
      action.payload.channels.forEach((channel) => {
        channel.videoIds = new Set(channel.videoIds);
        if (state[channel.id]) {
          channel.videoIds = new Set([...state[channel.id].videoIds, ...channel.videoIds]);
        }
        channels[channel.id] = channel;
      });
      newState = Object.assign({}, state, channels);
      return newState;
    default:
      return state;
  }
}

export default channelsReducer;