import React, { useContext, useState, useEffect } from 'react';
import Modal from '../modal/modal';
import ProfileDropdown from './dropdowns/profile_dropdown';
import DarkModeDropdown from './dropdowns/dark_mode_dropdown';
import { ThemeContext } from '../../context/theme_context';
import DotDropdown from './dropdowns/dot_dropdown';
import { connect } from 'react-redux';

function NavDropdown({ setDropdown, initialMode }) {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  let dropdownMenu;

  switch (mode) {
    case "dot":
      dropdownMenu = (<DotDropdown setMode={setMode} />);
      break;
    case "profile":
      dropdownMenu = (<ProfileDropdown setMode={setMode} toggleDropdown={setDropdown} />);
      break;
    case "darkMode":
      dropdownMenu = (<DarkModeDropdown setMode={setMode} initialMode={initialMode} />);
      break;
    default:
      dropdownMenu = (<ProfileDropdown setMode={setMode} />);
  }

  return (
    <>
      <Modal clickListener={setDropdown}/>
      {dropdownMenu}
    </>
  )
}


const msp = state => {
  const initialMode = state.session.id ? "profile" : "dot";
  return {
    initialMode
  };
};


export default connect(msp, null)(NavDropdown);