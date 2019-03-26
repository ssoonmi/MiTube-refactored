import ajax from './ajax';

export const RECEIVE_VIDEO = "RECEIVE_VIDEO";

export const createVideo = (video, channelId) => dispatch => {
  return ajax({
    method: "POST",
    url: `/api/channels/${channelId}/videos`,
    data: video,
    success: (payload) => dispatch(receiveVideo(payload))
  });
};

function receiveVideo(payload) {
  return {
    type: RECEIVE_VIDEO,
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