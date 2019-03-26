import React from 'react';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

const LoaderContainer = styled.div.attrs(({ loading, marginTop }) => ({
  display: loading ? "block" : "none",
  marginTop
}))`
  margin: 0 auto;
  width: fit-content;
  margin-top: ${props => props.marginTop};
  display: ${props => props.display};
`;

function Loader({ marginTop, loading, size, sizeUnit }) {
  marginTop = marginTop || 0;

  let sizeProps = {};
  if (size && sizeUnit) {
    sizeProps = {size, sizeUnit};
  }

  return (
    <LoaderContainer loading={loading} marginTop={marginTop}>
      <ClipLoader
        color={'#123abc'}
        loading={loading}
        {...sizeProps}
      />
    </LoaderContainer>
  );
}

export default Loader;