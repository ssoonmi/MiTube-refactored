import React, { useContext } from 'react';
import { ThemeContext } from '../../context/theme_context';
import VideoList from './video_list';
import { Link, withRouter } from 'react-router-dom';
import { List, Header } from './video_list/styled_components';
import styled from 'styled-components';

function PlaylistVideoList({ videoIds, playlist, history }) {
  const theme = useContext(ThemeContext);

  const goToPlaylist = () => {
    if (playlist.id) {
      history.push(`/playlist/${playlist.id}`);
    }
  };

  return (
    <List theme={theme}>
      <Header theme={theme}>
        <div>
          <div className="header-info">
            <div 
              style={playlist.id ? {cursor: "pointer"} : {}}
              onClick={goToPlaylist}>
              <h4>{playlist.name}</h4>
            </div>
            <Link className="play-all" to={`/playlist/${playlist.id}`}>
              <i className="fas fa-play"></i>
              <span>PLAY ALL</span>
            </Link>
          </div>
          {playlist.description ? (
            <div className="description">
              {playlist.description}
            </div> 
          ) : (
            null
          )}
        </div>
      </Header>
      <VideoList videoIds={videoIds} />
    </List>
  )
}

export default withRouter(PlaylistVideoList);