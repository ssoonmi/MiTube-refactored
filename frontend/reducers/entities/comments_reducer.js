import {
  RECEIVE_COMMENT,
  RECEIVE_COMMENTS,
  REMOVE_COMMENT
} from '../../actions/comment_actions';

const defaultState = {};

function commentsReducer(state = defaultState, action) {
  let newState;
  switch (action.type) {
    case RECEIVE_COMMENTS:
    case RECEIVE_COMMENT:
      return Object.assign({}, state, action.comments);
    case REMOVE_COMMENT:
      newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
}

export default commentsReducer;