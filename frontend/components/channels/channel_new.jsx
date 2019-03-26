import React, { useContext } from 'react';
import ChannelForm from './channel_form';
import { connect } from 'react-redux';
import { createChannel } from '../../actions/channel_actions';
import { ThemeContext } from '../../context/theme_context';
import { withRouter } from 'react-router-dom';
import { FormPage } from '../shared/shared_styled_components';

function ChannelNew({ submitAction, loggedIn }){
  const theme = useContext(ThemeContext);
  if (!loggedIn) {
    window.location = '/auth/google_oauth2';
    return (
      null
    );
  } else {
    return (
      <FormPage theme={theme}>
        <section>
          <h2>Create a New Channel</h2>
          <ChannelForm submitValue="Make Channel" submitAction={submitAction}/>
        </section>
      </FormPage>
    );
  }
}

const msp = state => {
  return {
    loggedIn: Boolean(state.session.id)
  }
}

const mdp = dispatch => {
  return {
    submitAction: (channel) => dispatch(createChannel(channel))
  };
};

export default withRouter(connect(msp, mdp)(ChannelNew));