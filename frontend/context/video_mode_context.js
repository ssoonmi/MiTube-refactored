import React from 'react';
import { connect } from 'react-redux';

export const VideoModeContext = React.createContext();

function VideoModeProvider({ children, mode }) {
  return (
    <VideoModeContext.Provider value={mode}>
      {children}
    </VideoModeContext.Provider>
  );
}

const msp = (state) => {
  return {
    mode: state.ui.videoMode
  };
};

export default connect(msp, null)(VideoModeProvider);