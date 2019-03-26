import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import VideoNew from './video_new';
import { fetchOwnChannels } from '../../actions/channel_actions';
import Loader from '../shared/loader';

function VideoNewRouter({ loggedIn, user, fetchOwnChannels }) {
  const [loadingChannels, setLoadingChannels] = useState(true);

  if (!loggedIn) {
    window.location = '/auth/google_oauth2';
    return (
      null
    );
  } else {
    useEffect(() => {
      fetchOwnChannels().then(() => {
        setLoadingChannels(false);
      });
    }, [loggedIn]);

    if (loadingChannels) {
      return (
        <Loader loading={loadingChannels} marginTop={"30vh"} />
      );
    } else {
      if (!user.channelIds) {
        return (
          <Redirect to="/channels/new" />
        );
      } else {
        return (
          <VideoNew />
        );
      }
    }
  }
}

const msp = (state) => {
  const currentUserId = state.session.id;
  let user = {};
  if (currentUserId) {
    user = state.entities.users[currentUserId];
  }
  return {
    user,
    loggedIn: Boolean(currentUserId),
  };
};

const mdp = dispatch => {
  return {
    fetchOwnChannels: () => dispatch(fetchOwnChannels()),
  };
};

export default withRouter(connect(msp, mdp)(VideoNewRouter));