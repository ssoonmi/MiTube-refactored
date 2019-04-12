import { 
  RECEIVE_OWN_CHANNEL, 
  RECEIVE_CHANNEL, 
  RECEIVE_CHANNELS } from '../../actions/channel_actions';
import {
  RECEIVE_COMMENT,
  RECEIVE_COMMENTS,
  REMOVE_COMMENT
} from '../../actions/comment_actions';
import { 
  RECEIVE_VIDEO,
  RECEIVE_CREATE_VIDEO } from '../../actions/video_actions';

const defaultState = {};

function videosReducer(state=defaultState, action) {
  let videos;
  let video;
  let comments;
  let newState;
  switch (action.type) {
    case RECEIVE_CHANNELS:
    case RECEIVE_CHANNEL:
    case RECEIVE_OWN_CHANNEL:
      return Object.assign({}, state, action.payload.videos);
    case RECEIVE_VIDEO:
    case RECEIVE_CREATE_VIDEO:
      return Object.assign({}, state, {[action.video.id]: action.video});
    case RECEIVE_COMMENT:
      newState = Object.assign({}, state);
      comments = Object.values(action.comments);
      if (comments.length == 0 || !newState[action.videoId].commentIds) {
        newState[action.videoId].commentIds = new Set();
      }
      comments.forEach((comment) => {
        newState[action.videoId].commentIds.add(comment.id);
        newState[action.videoId].numComments++;
      });
      return newState;
    case RECEIVE_COMMENTS:
      newState = Object.assign({}, state);
      comments = Object.values(action.comments);
      if (comments.length == 0 || !newState[action.videoId].commentIds) {
        newState[action.videoId].commentIds = new Set();
      }
      comments.forEach((comment) => {
        newState[action.videoId].commentIds.add(comment.id);
      });
      return newState;
    case REMOVE_COMMENT:
      newState = Object.assign({}, state);
      newState[action.videoId].commentIds.delete(action.id);
      newState[action.videoId].numComments--;
      return newState;
    default:
      return state;
  }
}

export default videosReducer;