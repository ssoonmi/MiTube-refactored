import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from '../home/home';
import ChannelNew from '../channels/channel_new';
import VideoNew from '../videos/video_new_router';
import VideoShow from '../videos/video_show';
import ChannelShow from '../channels/channel_show';
import { AuthRoute, ProtectedRoute } from '../util/routes';

// React.memo will make it so that this component will only rerender
// if props change
const Main = React.memo(() => {
  return (
    <Switch>
      <Route path="/channels/new" component={ChannelNew}/>
      <Route path="/videos/new" component={VideoNew} />
      <Route path="/videos/:videoId" component={VideoShow} />
      <Route path="/channels/:channelId" component={ChannelShow} />
      <Route path="/" component={Home} />
    </Switch>
  )
});

export default withRouter(Main);