import ajax from './ajax';

export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT_FORM_ERRORS = "RECEIVE_COMMENT_FORM_ERRORS";

const receiveComment = (payload, videoId) => {
  return {
    type: RECEIVE_COMMENT,
    comments: payload.comments,
    users: payload.users,
    videoId
  };
};

const removeComment = (id, videoId) => {
  return {
    type: REMOVE_COMMENT,
    id,
    videoId
  };
};

const receiveComments = (payload, videoId) => {
  return {
    type: RECEIVE_COMMENTS,
    comments: payload.comments || {},
    users: payload.users || {},
    videoId
  };
};

const receiveCommentFormErrors = (errors) => {
  return {
    type: RECEIVE_COMMENT_FORM_ERRORS,
    errors
  };
};

export const fetchComments = (id) => dispatch =>  {
  return ajax({
    method: "GET",
    url: `/api/videos/${id}/comments`,
    success: (payload) => dispatch(receiveComments(payload, id))
  });
};

export const createComment = (comment, videoId) => dispatch => {
  return ajax({
    method: "POST",
    url: `/api/videos/${videoId}/comments`,
    data: { comment },
    success: (payload) => dispatch(receiveComment(payload, videoId)),
    error: (errors) => dispatch(receiveCommentFormErrors(errors))
  });
};

export const updateComment = (comment) => dispatch => {
  return ajax({
    method: "PATCH",
    url: `/api/comments/${comment.id}`,
    data: { comment },
    success: (payload) => dispatch(receiveComment(payload, comment.video_id)),
    error: (errors) => dispatch(receiveCommentFormErrors(errors))
  });
};

export const deleteComment = (id, videoId) => dispatch => {
  return ajax({
    method: "DELETE",
    url: `/api/comments/${id}`,
    success: () => dispatch(removeComment(id, videoId))
  });
};