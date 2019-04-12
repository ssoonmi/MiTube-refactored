import { CHANGE_VIDEO_MODE } from '../../actions/ui_actions';

const defaultState = null;

function videoModeReducer(state=defaultState, action) {
  switch (action.type) {
    case CHANGE_VIDEO_MODE:
      return action.mode;
    default: 
      return state;
  }
}

export default videoModeReducer;