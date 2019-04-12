import React, { useContext } from 'react';
import { connect } from 'react-redux';
import Modal from '../modal/modal';
import NavBarLeft from '../nav/nav_bar_left';
import { ThemeContext } from '../../context/theme_context';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav.attrs(({ theme, show, modal }) => ({
  headerBackgroundColor: theme.background,
  backgroundColor: theme.menuBackground,
  menuItemHoverBackground: theme.menuItemHoverBackground,
  show,
  modal
}))`
  z-index: 1000;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: ${props => props.show ? '0' : '-230px'};
  ${props => props.modal ? 'transition: left 0.2s linear;' : ''}
  bottom: 0;
  height: 100vh;
  width: 230px;
  overflow: hidden;
  background-color: ${props => props.backgroundColor}

  ul:first-of-type {
    background-color: ${props => props.headerBackgroundColor}
    height: 56px;
    width: 236px;
    box-shadow: 0px 3px 8px 0px rgba(17, 17, 17, .06);
    padding-left: 12px;
    margin-bottom: 3px;
  }

  ul:last-of-type {
    overflow-y: auto;
    width: 100%;

    section {
      padding: 12px 0;
    }

    li {
      display: flex;
      height: 40px;
      padding: 0 24px;
      align-items: center;
      cursor: pointer;

      &:hover {
        background-color: ${props => props.menuItemHoverBackground}
      }
    }
  }
`;

function SideNav({ show, mode, toggleSideNav }) {
  const theme = useContext(ThemeContext);

  return (
    <> 
      {show && (mode == 'modal') ? 
        <Modal backgroundColor={theme.modal} clickListener={toggleSideNav}/> 
        : null}
      <Nav id="side-nav" theme={theme} show={show} modal={mode == 'modal'}>
        <NavBarLeft 
          theme={theme}
          onSideNav={true} 
          toggleSideNav={toggleSideNav} />
        <ul>
          <section>
            <Link to="/" onClick={toggleSideNav}>
              <li>Home</li>
            </Link>
          </section>
        </ul>
      </Nav>
    </>
  );
}

export default SideNav;