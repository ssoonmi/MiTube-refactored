import React, { useContext, useEffect, useState } from 'react';
import { FormPage } from '../shared/shared_styled_components';
import { ThemeContext } from '../../context/theme_context';
import VideoForm from './video_form';
import { connect } from 'react-redux';
import { createVideo } from '../../actions/video_actions';

function VideoNew({ submitAction }) {
  const theme = useContext(ThemeContext);
  return (
    <FormPage theme={theme}>
      <section>
        <h2>Upload a Video</h2>
        <VideoForm
          submitValue="Upload Video"
          submitAction={submitAction} />
      </section>
    </FormPage>
  );
}

const mdp = dispatch => {
  return {
    submitAction: (video, channelId) => dispatch(createVideo(video, channelId))
  }
}

export default connect(null, mdp)(VideoNew);