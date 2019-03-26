import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/theme_context';
import { timeAgo } from '../util/helper_functions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Item = styled.div.attrs(({ theme }) => ({
  color: theme.color,
  smallLink: theme.smallLink
}))`
  cursor: pointer;
  width: 210px; 

  .image {
    width: 100%;
    height: 118px;
    background-position: center;
    background-size: cover;
    border-radius: 1px;
  }

  .info {
    padding-right: 24px;

    h5 {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-weight: 500;
      margin: 8px 0px;
      max-height: 32px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      line-height: 16px;
    }
    
    .details {
      display: flex;
      flex-direction: column;
      color: ${props => props.smallLink};
      height: fit-content;
      justify-content: flex-start;
      font-size: 13px;

      h6:hover {
        color: ${props => props.color};
      }

      > div {
        display: flex;

        span {
          margin-right: 4px;

          &:last-of-type {
            margin-right: 0;
          }
        }
      }
    }

  }
`;

function VideoListItem({ video, channel }) {
  const theme = useContext(ThemeContext);

  return (
    <Link to={`/videos/${video.id}`}>
      <Item theme={theme}>
        <div className="image"
          style={video.thumbnail ? 
            {backgroundImage: `url(${video.thumbnail})`} 
            : {}}>
        </div>
        <div className="info">
          <h5>{video.title}</h5>
          <div className="details">
            <Link to={`/channels/${channel.id}`}>
              <h6>{channel.name}</h6>
            </Link>
            <div>
              <span>{video.numViews || 0} views</span>
              <span>•</span>
              <span>{timeAgo(video.created_at)}</span>
            </div>
          </div>
        </div>
      </Item>
    </Link>
  )
}

const msp = (state, ownProps) => {
  const video = state.entities.videos[ownProps.videoId];
  const { channel_id } = video;
  return {
    video,
    channel: state.entities.channels[channel_id]
  };
};

export default connect(msp, null)(VideoListItem);