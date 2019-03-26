import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import VideoListItem from './video_list_item';

const List = styled.div.attrs(() => ({

}))`
  width: 100%;
  overflow: hidden;
  margin: 24px 0px;

  > ul {
    display: flex;

    > li {
    padding-right: 4px;
    width: fit-content;

    &:last-of-type {
      padding-right: 0px;
    }
  }
  }
  
`;

function VideoList({ videoIds }) {
  const videoLis = videoIds.map((videoId, idx) => {
    return (
      <li key={idx}>
        <VideoListItem videoId={videoId} />
      </li>
    );
  });
  return (
    <List>
      <ul>
        {videoLis}
      </ul>
    </List>
  );
}

export default VideoList;