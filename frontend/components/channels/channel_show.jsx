import React, { useEffect, useContext, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { ThemeContext } from '../../context/theme_context';
import styled from 'styled-components';
import { fetchChannel } from '../../actions/channel_actions';
import Loader from '../shared/loader';
import ChannelHeader from './channel_show/channel_header';
import ChannelShowRoutes from './channel_show/channel_show_routes';
import { WidthContext } from '../../context/width_context';

const ChannelPage = styled.article.attrs(({ theme, mainWidth }) => ({
  backgroundColor: theme.background,
  mainWidth
}))`

  .main {
    background-color: ${props => props.backgroundColor};
    overflow: auto;

    > div {
      margin: 0 auto;
      width: ${props => props.mainWidth};
    }
  }

`;

function ChannelShow({ channelId, channel, fetchChannel }) {
  const theme = useContext(ThemeContext);
  const mainWidth = useContext(WidthContext);
  let headerRef = useRef(null);
  const [switchChannel, setSwitchChannel] = useState(true);

  useEffect(() => {
    setSwitchChannel(true);
    fetchChannel(channelId);
    setTimeout(() => setSwitchChannel(false), 300);
  }, [channelId]);

  return (
    <ChannelPage theme={theme} mainWidth={mainWidth}>
      <Loader loading={!channel || switchChannel} marginTop={"30vh"} />
      {(channel && !switchChannel) ? (
        <>
          <ChannelHeader channel={channel} headerRef={headerRef} setHeaderRef={headerRef}/>
          <ChannelShowRoutes channel={channel} headerRef={headerRef} />
        </>
      ) : null}
    </ChannelPage>
  );
}

const msp = (state, ownProps) => {
  const channelId = ownProps.match.params.channelId;
  return {
    channelId,
    channel: state.entities.channels[channelId]
  };
};

const mdp = dispatch => {
  return {
    fetchChannel: (channelId) => dispatch(fetchChannel(channelId))
  }
}

export default connect(msp, mdp)(ChannelShow);