import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { ThemeContext } from '../../../context/theme_context';
import { Dropdown } from '../nav_styled_components';

function DotDropdown({ setMode }) {
  const theme = useContext(ThemeContext);
  return (
    <Dropdown theme={theme}>
      <section>
        <section>
          <li onClick={() => setMode("darkMode")}>
            <span>Dark Mode</span>
          </li>
        </section>
      </section>

    </Dropdown>
  )
}

export default DotDropdown;