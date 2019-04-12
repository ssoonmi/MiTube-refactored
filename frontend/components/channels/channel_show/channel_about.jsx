import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../../context/theme_context';

const Container = styled.div.attrs(({ theme }) => ({
  border: theme.videoListBorder
}))`
  width: 100%;
  margin: 0 auto;
  display: flex;
  
  .first-column {
    padding-right: 96px;
    flex: 2;

    h4 {
      font-size: 16px;
      margin: 24px 0px;
    }
    
    > div {
      border-bottom: 1px solid ${props => props.border};
      padding-bottom: 32px;
    }
  }

  .second-column {
    flex: 1;

    > div {
      border-bottom: 1px solid ${props => props.border};
    }

    h4 {
      margin-top: 12px;
      padding: 12px 0px;
      font-size: 16px;
    }

    span {
      display: block;
      padding: 12px 0px;
    }
  }

  
`;

function ChannelAbout({ channel }) {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container theme={theme}>
        <div className="first-column">
          <div>
            <h4>
              Description
            </h4>
            <span>
              {channel.description}
            </span>
          </div>
          <div>
            <h4>
              Details
            </h4>
            <span></span>
          </div>
        </div>
        <div className="second-column">
          <div>
            <h4>Stats</h4>
          </div>
          <div>
            <span>Joined {channel.created_at ? 
              new Date(channel.created_at).toLocaleDateString("en-US", { 
                year: 'numeric', month: 'long', day: 'numeric' 
              }) : null}
            </span>
          </div>
          <div>
            <span>{channel.numViews || 0} views</span>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ChannelAbout;