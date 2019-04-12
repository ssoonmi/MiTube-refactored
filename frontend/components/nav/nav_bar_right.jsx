import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NavIcon } from './nav_styled_components';
import { connect } from 'react-redux';
import ProfileButton from '../util/profile_button';
import NavDropdown from './nav_dropdown';
import { ThemeContext } from '../../context/theme_context';

const RightSection = styled.ul.attrs(({ theme, actualTheme }) => ({
    blue: theme.blue,
    plusColor: theme.name == 'light' ? 'white' : '#525252',
    resetColor: actualTheme.color
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  .fa-video {
    position: relative;

    &> span {
      position: absolute;
      color: ${props => props.plusColor};
      left: 0.1em;
      top: -0.1em;
    }
  }

  .sign-in-btn {
    display: flex;
    font-size: 14px;
    align-items: center;
    color: ${props => props.blue};
    padding: 10px 16px;
    height: 40px;
    min-width: max-content;
    border-radius: 3px;
  }

  > div {
    min-width: 60px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-size: 1rem;

    ul {
      color: ${props => props.resetColor};
    }
  }

`;

function NavBarRight({ id, loggedIn, theme }) {
  const actualTheme = useContext(ThemeContext);
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = function(e) {
    e.stopPropagation();
    setDropdown(!dropdown);
  };

  if (loggedIn) {
    return (
      <RightSection 
        theme={theme}
        actualTheme={actualTheme}>
        <Link to="/videos/new">
          <NavIcon>
            <i className="fas fa-video">
              <span>+</span>
            </i>
          </NavIcon>
        </Link>
        <div>
          {dropdown ? <NavDropdown setDropdown={toggleDropdown} /> : null}
          <div onClick={toggleDropdown}>
            <ProfileButton
              id={id}
              size={"32px"}
            />
          </div>
        </div>
      </RightSection>
    );
  } else {
    return (
      <RightSection 
        theme={theme}
        actualTheme={actualTheme}>
        <Link to="/videos/new">
          <NavIcon>
            <i className="fas fa-video">
              <span>+</span>
            </i>
          </NavIcon>
        </Link>
        <div>
          {dropdown ? <NavDropdown setDropdown={toggleDropdown} /> : null}
          <div onClick={toggleDropdown}>
            <NavIcon>
              <i className="fas fa-ellipsis-v"></i>
            </NavIcon>
          </div>
        </div>
        <li><a href="/auth/google_oauth2" className="sign-in-btn">SIGN IN</a></li>
      </RightSection>
    );
  }
}

const msp = (state) => {
  return {
    id: state.session.id,
    loggedIn: Boolean(state.session.id)
  };
};

export default connect(msp, null)(NavBarRight);