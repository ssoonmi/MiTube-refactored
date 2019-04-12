import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ThemeContext } from '../../context/theme_context';
import { fetchVideo } from '../../actions/video_actions';
import Loader from '../shared/loader';
import VideoPlayer from './video_show/video_player';
import VideoInfo from './video_show/video_info';
import NextVideoPlaylist from './video_show/next_video_playlist';
import VideoComments from './video_show/video_comments';
import { changeVideoMode } from '../../actions/ui_actions';

const VideoPage = styled.article.attrs(({ theme, mode }) => ({
  mode
}))`
  #theater-mode {
    ${props => props.mode == 'fullscreen' ? 'height: 100vh;' : null}
  }

  .grid-area {
    margin-left: 24px;
    padding-right: 24px;
    ${props => props.mode == 'default' ? 'padding-top: 24px' : null}
    display: grid;
    grid-template-areas: 
      ${props => props.mode == 'default' ? "'player player up-next'" : null}
      'info info up-next'
      'comments comments up-next';
    grid-column-gap: 24px;
    min-height: 0px;
    min-width: 0px;

    #default-mode {
      width: 100%;
      grid-area: player;
    }
  }
  
  section {
    width: 100%;
  }
`;

function VideoShow({ videoId, video, fetchVideo, channel, changeVideoMode }) {
  const theme = useContext(ThemeContext);
  const [mode, setMode] = useState('default');
  const [switchVideo, setSwitchVideo] = useState(true);

  useEffect(() => {
    changeVideoMode(mode);
    return (() => {
      changeVideoMode(null);
    });
  }, []);

  useEffect(() => {
    changeVideoMode(mode);
  }, [mode]);

  function toggleMode(mode) {
    const theaterMode = document.getElementById('theater-mode');
    const defaultMode = document.getElementById('default-mode');
    if (theaterMode && defaultMode) {
      if (mode == 'default') {
        while (theaterMode.childNodes.length > 0) {
          defaultMode.appendChild(theaterMode.childNodes[0]);
        }
        setMode(mode);
      } else {
        while (defaultMode.childNodes.length > 0) {
          theaterMode.appendChild(defaultMode.childNodes[0]);
        }
        setMode(mode);
      }
    }
  }

  useEffect(() => {
    setSwitchVideo(true);
    fetchVideo(videoId);
    setTimeout(() => setSwitchVideo(false), 300);
  }, [videoId]);

  if (switchVideo || !video) {
    return (
      <Loader loading={!video || switchVideo} marginTop={"30vh"} />
    );

  } else {
    return (
      <VideoPage 
          theme={theme}
          mode={mode}>
        <div id="theater-mode"></div>
        <div className="grid-area">
          <div id="default-mode">
            <VideoPlayer
              video={video}
              toggleMode={toggleMode}
              mode={mode} />
          </div>
          <VideoInfo video={video} channel={channel} />
          <NextVideoPlaylist video={video} />
          <VideoComments video={video} />
        </div>
      </VideoPage>
    );
  }

}

const msp = (state, ownProps) => {
  const videoId = ownProps.match.params.videoId;
  const video = state.entities.videos[videoId];
  let channel = {};
  if (video) {
    channel = state.entities.channels[video.channel_id];
  }

  return {
    videoId,
    video,
    channel
  };
};

const mdp = dispatch => {
  return {
    fetchVideo: (id) => dispatch(fetchVideo(id)),
    changeVideoMode: (mode) => dispatch(changeVideoMode(mode))
  }
};

export default connect(msp, mdp)(VideoShow);