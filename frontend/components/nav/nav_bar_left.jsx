import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavIcon } from './nav_styled_components';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/theme_context';

const LeftSection = styled.ul`
  display: flex;
  font-size: 16px;
  justify-content: center;
  align-items: center;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    height: 20px;
    color: red;
    margin-right: 76px;
    margin-left: 8px;
    
    i {
      height: 1em;
    }

    img {
      margin-left: 5px;
    }
  }
`;

export default function NavBarLeft({ onSideNav, toggleSideNav, theme }) {
  return (
    <LeftSection>
      <div onClick={toggleSideNav}>
        <NavIcon>
          <i className="fas fa-bars"></i>
        </NavIcon>
      </div>
      <li>
        <Link className="logo" to='/' onClick={onSideNav ? toggleSideNav : () => {}}>
          <i className="fab fa-youtube"></i>
          <img src={theme.name == 'light' ? window.logo : window.logoDark} />
        </Link>
      </li>
    </LeftSection>
  );
}