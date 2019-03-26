import React, { useEffect, useContext } from 'react';
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
    height: 200vh;

    > div {
      margin: 0 auto;
      overflow: auto;
      width: ${props => props.mainWidth};
    }
  }

`;

function ChannelShow({ channelId, channel, fetchChannel }) {
  const theme = useContext(ThemeContext);
  const mainWidth = useContext(WidthContext);

  useEffect(() => {
    fetchChannel(channelId);
  }, [channelId]);

  return (
    <ChannelPage theme={theme} mainWidth={mainWidth}>
      <Loader loading={!channel} marginTop={"30vh"} />
      {channel ? (
        <>
          <ChannelHeader channel={channel}/>
          <section className="main">
            <div>
              <ChannelShowRoutes channel={channel}/>
            </div>
          </section>
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