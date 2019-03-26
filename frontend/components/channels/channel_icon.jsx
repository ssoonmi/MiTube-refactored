import React from 'react';
import styled from 'styled-components';

const Icon = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 100%;
  height: 100%;

  .image {
    background-size: cover;
    background-position: center;
  }

  .name {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;

function ChannelIcon({ channel, fontSize }) {
  if (channel.icon) {
    return (
      <Icon>
        <div className="image" style={{ backgroundImage: `url(${channel.icon})` }} />
      </Icon>
    );
  } else {
    return (
      <Icon>
        <div className="name" style={{
          backgroundColor: "purple",
          color: "white",
          fontSize: fontSize
        }}>
          {channel.name[0]}
        </div>
      </Icon>
    );
  }
}

export default ChannelIcon;