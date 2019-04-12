import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SubscribeButton from '../../shared/subscribe_button';
import ChannelIcon from '../../channels/channel_icon';

const Info = styled.section`
  display: flex;
  flex-direction: column;
  grid-area: info;
  margin-right: 0px;
  padding-bottom: 16px;
  border-bottom: 1px solid gray;

  .channel-icon {
    min-width: 48px;
    min-height: 48px;
    width: 48px;
    height: 48px;
    margin-right: 16px;
  }

  > .header {
    display: flex;
    flex-direction: column;
    padding: 20px 0 8px 0;
    border-bottom: 1px solid gray;

    > h2 {
      font-size: 18px;
    }

    > .details {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 40px;
      align-items: center;
      font-size: 16px;
    }
  }

  > .details {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-direction: column;
    
    > .channel {
      padding-top: 16px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      width: 100%;
      position: relative;

      .channel-info {
        display: flex;
        flex-direction: column;
      }

      h3 {
        font-weight: bold;
      }

      .published-on {
        font-size: 13px;
      }

      >.subscribe-container {
        position: absolute;
        right: 0;
      }
    }

    > .description {
      margin-left: 64px;
    }
  }
`;

function VideoInfo({ channel, video }) {

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  const publishedOn = new Date(video.created_at).toLocaleString('en-US', dateOptions);

  return (
    <Info>
      <div className="header">
        <h2>{video.title}</h2>
        <div className="details">
          <div>{video.numViews} views</div>
          {/* {video ? <VideoShowLikesContainer video={video} /> : null} */}
        </div>
      </div>
      <div className="details">
        <div className="channel">
          <div className="channel-icon">
            <Link to={`/channels/${channel.id}`}>
              <ChannelIcon fontSize={"14px"} channel={channel} />
            </Link>
          </div>
          <div className="channel-info">
            <h3>
              <Link to={`/channels/${channel.id}`}>
                {channel.name}
              </Link>
            </h3>
            <div className="published-on">Published on {publishedOn}</div>
          </div>
          <div className="subscribe-container">
            <SubscribeButton channel={channel} />
          </div>
        </div>
        <div className="description">{video.description}</div>
      </div>
    </Info>
  );
}

export default VideoInfo;