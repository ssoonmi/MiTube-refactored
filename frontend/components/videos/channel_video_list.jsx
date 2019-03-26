import React, { useContext } from 'react';
import { ThemeContext } from '../../context/theme_context';
import VideoList from './video_list';
import ChannelIcon from '../channels/channel_icon';
import SubscribeButton from '../shared/subscribe_button';
import { Link } from 'react-router-dom';
import { List, Header } from './video_list/styled_components';
import styled from 'styled-components';

function ChannelVideoList({ videoIds, channel, recommended }) {
  const theme = useContext(ThemeContext);

  return (
    <List theme={theme}>
      <Header theme={theme}>
        <div>
          <div className="header-info">
            <Link to={`/channels/${channel.id}`}>
              <div className="icon">
                <ChannelIcon channel={channel} fontSize={"14px"} />
              </div>
              <h4>{channel.name}</h4>
            </Link>
            {recommended ? <span>Recommended channel for you</span> : null}
          </div>
          <div className="subscribe-container">
            <SubscribeButton channel={channel} />
          </div>
        </div>
      </Header>
      <VideoList videoIds={videoIds} />
    </List>
  )
}

export default ChannelVideoList;