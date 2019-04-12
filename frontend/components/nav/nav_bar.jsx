import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import NavBarLeft from './nav_bar_left';
import NavBarSearch from './nav_bar_search';
import NavBarRight from './nav_bar_right';
import { ThemeContext, themes } from '../../context/theme_context';
import { VideoModeContext } from '../../context/video_mode_context';

const Nav = styled.nav.attrs(({ theme }) => ({
  backgroundColor: theme.navBackground,
  color: theme.color,
}))`
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0px;
  transition: top 0.3s linear;
  right: 0px;
  left: 0px;
  padding: 0 16px;
  z-index: 500;
  box-shadow: 0px 3px 8px 0px rgba(17, 17, 17, .06);
`;
let scrollListener;

export default function NavBar({ toggleSideNav }) {
  let theme = useContext(ThemeContext);
  const [show, setShow] = useState(true);
  const [exitingFS, setExitingFS] = useState(false);
  const videoMode = useContext(VideoModeContext);

  useEffect(() => {
    if (exitingFS) {
      setShow(true);
    }
  }, [exitingFS]);

  useEffect(() => {
    if (videoMode == 'fullscreen') {
      setExitingFS(false);
      scrollListener = (e) => {
        if (window.pageYOffset == 0 && videoMode) {
          setShow(false);
        } else if (videoMode){
          setShow(true);
        }
      };
      window.addEventListener('scroll', scrollListener);
      setShow(false);
    } 
    return (() => {
      if (scrollListener) {
        window.removeEventListener('scroll', scrollListener);
        setExitingFS(true);
        scrollListener = null;
      }
    });
  }, [videoMode]);

  if (videoMode && videoMode != 'default') {
    theme = themes.dark;
  }
  
  return (
    <Nav theme={theme} style={show ? {} : {top: "-52px"}}>
      <NavBarLeft theme={theme} toggleSideNav={toggleSideNav} />
      <NavBarSearch theme={theme} />
      <NavBarRight theme={theme} />
    </Nav>
  );
}