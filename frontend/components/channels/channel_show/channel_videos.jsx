import React, { useContext } from 'react';
import { connect } from 'react-redux';
import VideoListItem from '../../videos/video_list_item';
import { List, Header } from '../../videos/video_list/styled_components';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../../../context/theme_context';
import { WidthContext } from '../../../context/width_context';

const VideoList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  > * {
    margin-right: 4px;
    margin-bottom: 24px;
  }
`;

function ChannelVideo({ channel, videoIds, history }) {
  const theme = useContext(ThemeContext);
  const width = useContext(WidthContext);

  const videoLis = videoIds.map((id) => {
    return (
      <VideoListItem 
        key={id} 
        videoId={id} />
    );
  });

  const playAllUploads = () => {
    history.push('/channel/videos/uploads');
  };  

  return (
    <List theme={theme}>
      <Header theme={theme}>
        <div>
          <div className="header-info">
            <h4>Uploads</h4>
            <div className="play-all" 
              onClick={playAllUploads}>
              <span>PLAY ALL</span>
            </div>
          </div>
        </div>
      </Header>
      <VideoList>
        {videoLis}
      </VideoList>
    </List>
  );
}

const msp = (state) => {
  return {
    videoIds: Object.keys(state.entities.videos)
  };
};


export default withRouter(connect(msp, null)(ChannelVideo));