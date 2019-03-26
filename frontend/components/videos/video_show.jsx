import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ThemeContext } from '../../context/theme_context';
import { fetchVideo } from '../../actions/video_actions';

const VideoPage = styled.article.attrs(({ theme }) => ({
  
}))`

`;

function VideoShow({ videoId, video, fetchVideo }) {
  const theme = useContext(ThemeContext);
  useEffect(() => {
    fetchVideo(videoId);
  }, [videoId]);
  return (
    <VideoPage theme={theme}>
      <h2>Video Show for {video.title}</h2>
    </VideoPage>
  );
}

const msp = (state, ownProps) => {
  const videoId = ownProps.match.params.videoId;
  return {
    videoId,
    video: state.entities.videos[videoId] || {}
  };
};

const mdp = dispatch => {
  return {
    fetchVideo: (id) => dispatch(fetchVideo(id))
  }
};

export default connect(msp, mdp)(VideoShow);