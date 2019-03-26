import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  background-color: red;
  color: white;
  margin: 0 4px;
  padding: 10px 16px;
  cursor: pointer;

  > span:last-of-type {
    margin-left: 16px;
  }
`;

function SubscribeButton({ channel }) {
  return (
    <Button>
      <span>SUBSCRIBE</span>
      <span>{channel.numSubscribers || 0}</span>
    </Button>
  );
}

export default SubscribeButton;