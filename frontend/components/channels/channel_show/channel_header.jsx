import React, { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../../context/theme_context';
import SubscribeButton from '../../shared/subscribe_button';
import ChannelIcon from '../channel_icon';
import ChannelHeaderLinks from './channel_header_links';

const Header = styled.section.attrs(({ theme }) => ({
  backgroundColor: theme.html
}))`
  position: sticky;

  .splash {
    position: relative;
    height: calc(100vw / 6.2 - 1px);
    width: 100%;
    overflow: hidden;

    div {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      position: absolute;
      z-index: -1;
    }
  }

  .header {
    display: flex;
    flex-direction: column;
    padding: 16px 107px 0 107px;
    background-color: ${props => props.backgroundColor};

    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .details {
        display: flex;
        align-items: center;

        .icon {
          min-width: 80px;
          min-height: 80px;
          width: 80px;
          height: 80px;
          margin-right: 24px;
        }

        h3 {
          font-size: 24px;
        }

        span {
          color: gray;
        }
      }

    }
  }
`;

function ChannelHeader({ channel }) {
  const theme = useContext(ThemeContext);
  const [headerTop, setHeaderTop] = useState(0);
  const headerRef = useRef(null);

  const resizeHeaderTop = () => {
    setHeaderTop(-headerRef.current.offsetHeight + 47 + 56);
  };

  useEffect(() => {
    if (headerRef.current) {
      resizeHeaderTop();
    }
  }, [headerRef, channel]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [channel]);
  
  useEffect(() => {
    window.addEventListener('resize', resizeHeaderTop);
    return () => {
      window.removeEventListener('resize', resizeHeaderTop);
    };
  }, []);

  return (
    <Header theme={theme} ref={headerRef} style={{top: headerTop}}>
      {channel.splash ? <Splash channel={channel} /> : null}
      <div className="header">
        <div className="info">
          <div className="details">
            <div className="icon">
              <ChannelIcon fontSize={"24px"} channel={channel} />
            </div>
            <div>
              <h3>{channel.name}</h3>
              <span>
                {channel.numSubscribers ? channel.numSubscribers : 0} subscribers
              </span>
            </div>
          </div>
          <SubscribeButton channel={channel} />
        </div>
      </div>
      <ChannelHeaderLinks channel={channel} />
    </Header>
  );
}

export default ChannelHeader;

function Splash({ channel }) {
  const [splashPos, setSplashPos] = useState(0);
  const splashRef = useRef(null);
  window.splashRef = splashRef;

  function scrollListener() {
    const pos = window.pageYOffset;
    setSplashPos(pos / 2);
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [channel]);

  return (
    <div className="splash" ref={splashRef} >
      <div style={channel.splash ? { backgroundImage: `url(${channel.splash})`, top: splashPos }: {}}></div>
    </div>
  );
}