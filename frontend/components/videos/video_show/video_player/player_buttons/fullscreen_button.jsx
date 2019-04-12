import React, { useState, useEffect } from 'react';

function isInFullScreen() {
  return (document.fullscreenElement && document.fullscreenElement !== null) ||
    (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
    (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
    (document.msFullscreenElement && document.msFullscreenElement !== null);
}

let prevMode;

function FullScreenButton({ toggleMode, mode, changeVideoMode }) {
  const [fullScreen, setFullScreen] = useState(isInFullScreen());

  useEffect(() => {
    function onFullScreenChange() {
      if (isInFullScreen()) {
        setFullScreen(true);
        toggleMode('fullscreen');
        document.getElementsByTagName("html")[0].classList.add('hidden-scrollbar');
      } else {
        setFullScreen(false);
        toggleMode(prevMode);
        document.getElementsByTagName("html")[0].classList.remove('hidden-scrollbar');
      }
    }

    document.addEventListener('webkitfullscreenchange', onFullScreenChange, false);
    document.addEventListener('mozfullscreenchange', onFullScreenChange, false);
    document.addEventListener('fullscreenchange', onFullScreenChange, false);

    return (() => {
      if (isInFullScreen()) {
        exitFullScreen();
      }
      if (document.getElementsByTagName("html")[0].classList.contains('hidden-scrollbar')) {
        document.getElementsByTagName("html")[0].classList.remove('hidden-scrollbar');
      }
      document.removeEventListener('webkitfullscreenchange', onFullScreenChange, false);
      document.removeEventListener('mozfullscreenchange', onFullScreenChange, false);
      document.removeEventListener('fullscreenchange', onFullScreenChange, false);
    });
  }, []);

  function makeFullScreen() {
    const el = document.documentElement;
    const rfs = el.requestFullscreen || 
      el.webkitRequestFullScreen || 
      el.mozRequestFullScreen || 
      el.msRequestFullscreen
    ;

    rfs.call(el);
  }

  function exitFullScreen() {
    const el = document;
    const rfs = el.exitFullscreen || 
      el.webkitExitFullscreen || 
      el.mozCancelFullScreen || 
      el.msExitFullscreen
    ;

    rfs.call(el);
  }

  function onClickHandler(e) {
    e.preventDefault();
    if (isInFullScreen()) {
      exitFullScreen();
    } else if (mode != 'fullscreen') {
      prevMode = mode;
      makeFullScreen();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }

  let viewButton;

  if (mode == 'theater') {
    viewButton = (
      <button
        className="view"
        onClick={() => toggleMode('default')}>
        <div className="small"></div>
      </button>
    );
  } else if (mode != 'fullscreen') {
    viewButton = (
      <button
        className="view"
        onClick={() => toggleMode('theater')}>
        <div className="large"></div>
      </button>
    );
  }

  return (
    <> 
      {viewButton}
      <button 
        className="fullscreen" 
        onClick={onClickHandler}>
        {fullScreen ? (
          <i className="fas fa-compress"></i>
        ) : (
          <i className="fas fa-expand"></i>
        )}
      </button>
    </>
  );
}

export default FullScreenButton;