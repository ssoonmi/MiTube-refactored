import React from 'react';
import styled from 'styled-components';

const Background = styled.div.attrs(({ backgroundColor }) => ({
  backgroundColor: backgroundColor || "transparent"
}))`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  opacity: 0.45;
  z-index: 600;
  background-color: ${props => props.backgroundColor};
`;

export default function Modal({ clickListener, backgroundColor }) {
  return (
    <Background backgroundColor={backgroundColor} onClick={clickListener} />
  );
}