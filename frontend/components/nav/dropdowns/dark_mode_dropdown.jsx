import React, { useContext } from 'react';
import { Dropdown } from '../nav_styled_components';
import { connect } from 'react-redux';
import { changeTheme } from '../../../actions/theme_actions';
import { ThemeContext } from '../../../context/theme_context';

function DarkModeDropdown({ setTheme, setMode, initialMode }) {
  const theme = useContext(ThemeContext);

  return (
    <Dropdown theme={theme}>
      <section>
        <li onClick={() => setMode(initialMode)}>
          Go Back
        </li>
        <li onClick={() => setTheme(theme.name == 'dark' ? 'light' : 'dark')}>
          Turn Dark Mode {theme.name == 'dark' ? 'Off' : 'On'}
        </li>
      </section>
    </Dropdown>
  );
}

const mdp = dispatch => {
  return {
    setTheme: (themeName) => dispatch(changeTheme(themeName))
  };
};

export default connect(null, mdp)(DarkModeDropdown);