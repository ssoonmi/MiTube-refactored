import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../actions/session_actions';
import ProfileButton from '../../util/profile_button';
import { ThemeContext } from '../../../context/theme_context';
import { Dropdown } from '../nav_styled_components';

function ProfileDropdown({ id, user, logout, setMode }) {
  const theme = useContext(ThemeContext);

  return (
    <Dropdown theme={theme}>
      <div>
        <ProfileButton size={"40px"} id={id} />
        <div>
          <div>{user.name}</div>
          <div>{user.email}</div>
        </div>
      </div>
      <section>
        <li onClick={logout}><span>Sign Out</span></li>
      </section>
      <section>
        <li onClick={() => setMode("darkMode")}>
          <span>Dark Mode</span>
        </li>
      </section>
    </Dropdown>
  );
}

const msp = state => {
  const id = state.session.id;
  return {
    id,
    user: state.entities.users[id],
  };
};

const mdp = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(msp, mdp)(ProfileDropdown);