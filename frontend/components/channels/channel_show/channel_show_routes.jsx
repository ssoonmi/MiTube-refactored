import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ChannelVideos from './channel_videos';
import ChannelHome from './channel_home';
import ChannelAbout from './channel_about';

function ChannelShowRoutes({ channel }) {
  return (
    <Switch>
      <Route path="/channels/:id/videos" render={() => <ChannelVideos channel={channel} />} />
      <Route path="/channels/:id/about" render={() => <ChannelAbout channel={channel} />}/>
      <Route path="/channels/:id/" render={() => <ChannelHome channel={channel} />} />
    </Switch>
  );
}

export default ChannelShowRoutes;