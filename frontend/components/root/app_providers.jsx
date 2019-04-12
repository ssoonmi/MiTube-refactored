import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ThemeProvider from '../../context/theme_context';
import VideoModeProvider from '../../context/video_mode_context';

export default function AppProvider({ children, store }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <VideoModeProvider>
          <HashRouter>
            {children}
          </HashRouter>
        </VideoModeProvider>
      </ThemeProvider>
    </Provider>
  )
}