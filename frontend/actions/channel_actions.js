import ajax from './ajax';

export const RECEIVE_OWN_CHANNEL = "RECEIVE_OWN_CHANNEL";
export const RECEIVE_USER_CHANNELS = "RECEIVE_OWN_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";

function receiveOwnChannel(payload) {
  return {
    type: RECEIVE_OWN_CHANNEL,
    payload
  };
}

function receiveChannel(payload) {
  return {
    type: RECEIVE_CHANNEL,
    payload
  };
}

function receiveChannels(payload) {
  return {
    type: RECEIVE_CHANNELS,
    payload
  };
}

function receiveUserChannels(payload, userId) {
  return {
    type: RECEIVE_USER_CHANNELS,
    payload,
    userId
  };
}

export const createChannel = (channel) => (dispatch) => {
  return ajax({
    method: "POST",
    url: "/api/channels",
    data: channel,
    success: (payload) => dispatch(receiveOwnChannel(payload))
  });
};

export const fetchChannel = (channelId) => (dispatch) => {
  return ajax({
    method: "GET",
    url: `/api/channels/${channelId}`,
    success: (payload) => dispatch(receiveChannel(payload))
  });
};

export const fetchChannels = (filters) => (dispatch) => {
  return ajax({
    method: "GET",
    url: `/api/channels/`,
    data: filters,
    success: (payload) => dispatch(receiveChannels(payload))
  });
};

export const fetchOwnChannels = () => (dispatch, getState) => {
  const currentUserId = getState().session.id;
  return ajax({
    method: "GET",
    url: `/api/users/${currentUserId}/channels/`,
    success: (payload) => dispatch(receiveUserChannels(payload, currentUserId))
  });
};

export const fetchUserChannels = (userId) => (dispatch) => {
  return ajax({
    method: "GET",
    url: `/api/users/${userId}/channels/`,
    success: (payload) => dispatch(receiveUserChannels(payload, userId))
  });
};