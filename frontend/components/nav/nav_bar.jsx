import React, { useContext } from 'react';
import styled from 'styled-components';

import NavBarLeft from './nav_bar_left';
import NavBarSearch from './nav_bar_search';
import NavBarRight from './nav_bar_right';
import { ThemeContext } from '../../context/theme_context';

const Nav = styled.nav.attrs(({ theme }) => ({
  backgroundColor: theme.navBackground,
}))`
  background-color: ${props => props.backgroundColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  padding: 0 16px;
  z-index: 500;
  box-shadow: 0px 3px 8px 0px rgba(17, 17, 17, .06);
`;

export default function NavBar({ toggleSideNav }) {
  const theme = useContext(ThemeContext);

  return (
    <Nav theme={theme}>
      <NavBarLeft toggleSideNav={toggleSideNav} />
      <NavBarSearch/>
      <NavBarRight/>
    </Nav>
  );
}