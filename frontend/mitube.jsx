import React from 'react';
import ReactDOM from 'react-dom';
import AppProviders from './components/root/app_providers';
import App from './components/root/app';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState = {};
  if (window.currentUser) {
    preloadedState = {
      entities: {
        users: {
          [window.currentUser.id]: window.currentUser
        }
      },
      session: { id: window.currentUser.id }
    };
  }
  const store = configureStore(preloadedState);

  ReactDOM.render(
    <AppProviders store={store}>
      <App />
    </AppProviders>, 
    document.getElementById('root')
  );

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    developmentAccess(store);
  }
}); 

import { createChannel } from './actions/channel_actions';
import { createVideo } from './actions/video_actions';

function developmentAccess(store) {

  window.store = store;
  window.state = store.getState();
  window.dispatch = store.dispatch;
  window.createChannel = createChannel;
  window.createVideo = createVideo;
}