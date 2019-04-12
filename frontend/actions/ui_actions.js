export const CHANGE_VIDEO_MODE = "CHANGE_VIDEO_MODE";

export const changeVideoMode = (mode) => {
  return {
    type: CHANGE_VIDEO_MODE,
    mode
  };
};