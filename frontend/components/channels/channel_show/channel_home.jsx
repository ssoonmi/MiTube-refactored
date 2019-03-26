import React from 'react';
import styled from 'styled-components';
import ChannelVideoList from '../../videos/channel_video_list';
import PlaylistVideoList from '../../videos/playlist_video_list';

function ChannelHome({ channel }) {
  const videoIds = Array.from(channel.videoIds);

  return (
    <>
      <PlaylistVideoList 
        videoIds={videoIds} 
        playlist={{name: "Popular Uploads"}} 
        channel={channel} />
      <PlaylistVideoList 
        videoIds={videoIds} 
        playlist={{name: "Uploads"}} 
        channel={channel} />
    </>
  );
}

export default ChannelHome;