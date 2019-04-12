import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import VideoListItem from '../../videos/video_list_item';
import { List, Header } from '../../videos/video_list/styled_components';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../../../context/theme_context';

const VideoList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  > * {
    margin-right: 4px;
    margin-bottom: 24px;
  }
`;

function ChannelVideo({ channel, history, headerRef }) {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (headerRef.current) {
      window.scrollTo(0, headerRef.current.offsetHeight - 47);
    }
  }, [headerRef.current]);
  
  const videoIds = channel.videoIds ? Array.from(channel.videoIds) : [];
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
    <List theme={theme} style={{ minHeight: `calc(100vh - 127px` }}>
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
        <div></div>
      </Header>
      <VideoList>
        {videoLis}
      </VideoList>
    </List>
  );
}

// const msp = (state) => {
//   return {
//     videoIds: ownProps
//   };
// };


export default withRouter((ChannelVideo));