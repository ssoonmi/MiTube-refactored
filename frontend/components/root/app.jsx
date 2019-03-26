import React, { useState } from 'react';
import NavBar from '../nav/nav_bar';
import Main from './main';
import SideNav from '../side_nav/side_nav';
import styled from 'styled-components';
import WidthProvider from '../../context/width_context';

const determineMode = () => {
  const width = document.body.clientWidth;
  if (width < 1164) {
    return 'modal';
  } else {
    return 'normal';
  }
};

function App() {
  const [showSideNav, setShowSideNav] = useState(false);
  const [sideNavMode, setSideNavMode] = useState(determineMode());

  const toggleSideNav = (e) => {
    e.stopPropagation();
    setShowSideNav(!showSideNav);
  };

  const sideNavModeToggle = () => {
    const newMode = determineMode();
    if (newMode != sideNavMode) {
      setSideNavMode(newMode);
    }
  };

  window.addEventListener('resize', sideNavModeToggle);

  return (
    <>
      <SideNav 
        mode={sideNavMode} 
        toggleSideNav={toggleSideNav} 
        show={showSideNav}/>
      <NavBar toggleSideNav={toggleSideNav}/>
      <WidthProvider 
        showNormalSideNav={showSideNav && sideNavMode == 'normal'}>
        <main
          style={showSideNav && sideNavMode == 'normal' ? {paddingLeft: "230px"} : {}}>
          <Main 
            shouldRerender={showSideNav && sideNavMode == 'normal'}/>
        </main>
      </WidthProvider>
    </>
  );
}

export default App;