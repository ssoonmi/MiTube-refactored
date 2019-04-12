import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import NavBar from '../nav/nav_bar';
import Main from './main';
import SideNav from '../side_nav/side_nav';
import WidthProvider from '../../context/width_context';
import { VideoModeContext } from '../../context/video_mode_context';

const determineMode = () => {
  const width = document.body.clientWidth;
  if (width < 1138) {
    return 'modal';
  } else {
    return 'normal';
  }
};

function App() {
  const videoMode = useContext(VideoModeContext);
  const [showSideNav, setShowSideNav] = useState(false);
  const [sideNavMode, setSideNavMode] = useState(videoMode ? 'modal' : determineMode());

  const toggleSideNav = (e) => {
    e.stopPropagation();
    setShowSideNav(!showSideNav);
  };

  const sideNavModeToggle = () => {
    const newMode = determineMode();
    if (sideNavMode != newMode) {
      setSideNavMode(newMode);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', sideNavModeToggle);
  }, []);

  let mainStyle = {};
  if (showSideNav && sideNavMode == 'normal' && !videoMode) {
    mainStyle.paddingLeft = "230px";
  }
  if (videoMode && videoMode == 'fullscreen') {
    mainStyle.marginTop = "0";
  }

  return (
    <div>
      <SideNav 
        mode={videoMode ? 'modal' : sideNavMode} 
        toggleSideNav={toggleSideNav} 
        show={showSideNav}/>
      <NavBar toggleSideNav={toggleSideNav}/>
      <WidthProvider 
        showNormalSideNav={showSideNav && sideNavMode == 'normal'}>
        <main
          style={mainStyle}>
          <Main 
            shouldRerender={showSideNav && sideNavMode == 'normal'}/>
        </main>
      </WidthProvider>
    </div>
  );
}

export default App;