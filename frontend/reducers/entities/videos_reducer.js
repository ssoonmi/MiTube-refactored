import { RECEIVE_OWN_CHANNEL, RECEIVE_CHANNEL, RECEIVE_CHANNELS } from '../../actions/channel_actions';
import { RECEIVE_VIDEO } from '../../actions/video_actions';

const defaultState = {};

function videosReducer(state=defaultState, action) {
  let videos;
  let video;
  switch (action.type) {
    case RECEIVE_CHANNELS:
    case RECEIVE_CHANNEL:
    case RECEIVE_OWN_CHANNEL:
      return Object.assign({}, state, action.payload.videos);
    case RECEIVE_VIDEO:
      videos = {};
      video = action.payload.video;
      if (state[video.id] && state[video.id].commentIds) {
        video.commentIds = new Set([...state[video.id].commentIds, ...video.commentIds]);
      }
      videos[video.id] = video; 
      return Object.assign({}, state, videos);
    default:
      return state;
  }
}

export default videosReducer;