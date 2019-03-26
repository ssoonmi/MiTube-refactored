import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Button = styled.img.attrs(({ size, src }) => ({
  src,
  width: size,
  height: size
}))`
  border-radius: 50%;
  min-width: ${props => props.width};
  min-height: ${props => props.height};
  width: ${props => props.width};
  height: ${props => props.height};
  cursor: pointer;
`;

function ProfileButton({ image, size }) {
  return (
    <Button size={size} src={image}/>
  );
}

const msp = (state, ownProps) => {
  return {
    image: state.entities.users[ownProps.id].image
  };
};

export default connect(msp, null)(ProfileButton);