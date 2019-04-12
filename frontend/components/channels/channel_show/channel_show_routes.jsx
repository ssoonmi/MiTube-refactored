import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import ChannelVideos from './channel_videos';
import ChannelHome from './channel_home';
import ChannelAbout from './channel_about';

function ChannelShowRoutes({ channel, headerRef }) {
  const [minHeight, setMinHeight] = useState(0);
  
  useEffect(() => {
    if (headerRef.current) {
      setMinHeight(`calc(100vh - ${headerRef.current.offsetHeight + 56}px)`);
    }
  }, [headerRef.current]);

  return (

    <section className="main" style={{ minHeight }}>
      <div>
        <Switch>
          <Route path="/channels/:id/videos" render={() => <ChannelVideos channel={channel} headerRef={headerRef}/>} />
          <Route path="/channels/:id/about" render={() => <ChannelAbout channel={channel} />}/>
          <Route path="/channels/:id/" render={() => <ChannelHome channel={channel} />} />
        </Switch>
      </div>
    </section>
  );
}

export default ChannelShowRoutes;