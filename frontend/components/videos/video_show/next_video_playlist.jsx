import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const UpNext = styled.section`
  grid-area: up-next;
  margin-left: 0px;
  height: 0px;
  overflow: visible;
`;

function NextVideoPlaylist({ video }) {
  return (
    <UpNext>
      <h3>Up Next</h3>
      <ul>
      </ul>
    </UpNext>
  );
}

const msp = state => {
  return {

  };
};

const mdp = dispatch => {
  return {

  };
};

export default connect(msp, mdp)(NextVideoPlaylist);