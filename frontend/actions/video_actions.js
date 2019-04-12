import ajax from './ajax';

export const RECEIVE_VIDEO = "RECEIVE_VIDEO";
export const RECEIVE_CREATE_VIDEO = "RECEIVE_CREATE_VIDEO";
export const RECEIVE_VIDEO_FORM_ERRORS = "RECEIVE_VIDEO_FORM_ERRORS";

export const createVideo = (video, channelId) => dispatch => {
  return ajax({
    method: "POST",
    url: `/api/channels/${channelId}/videos`,
    data: video,
    success: (payload) => dispatch(receiveCreateVideo(payload)),
    error: (response) => dispatch(receiveVideoFormErrors(response))
  });
};

function receiveCreateVideo(payload) {
  return {
    type: RECEIVE_CREATE_VIDEO,
    video: payload.video
  };
}

function receiveVideoFormErrors(response) {
  return {
    type: RECEIVE_VIDEO_FORM_ERRORS,
    response
  };
}

function receiveVideo(payload) {
  return {
    type: RECEIVE_VIDEO,
    video: payload.video,
    payload
  };
}

export const fetchVideo = (id) => (dispatch) => {
  return ajax({
    method: "GET",
    url: `/api/videos/${id}`,
    success: (payload) => dispatch(receiveVideo(payload))
  });
};

window.fetchVideo = fetchVideo;