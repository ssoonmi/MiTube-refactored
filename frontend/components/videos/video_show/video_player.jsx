import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ProgressBar from './video_player/progress_bar';
import PlayerButtons from './video_player/player_buttons';
// max-height: calc((9 / 16) * 100vw);
// video {
//   height: 100%;
// }

const Video = styled.section.attrs(({ mode }) => ({
  mode
}))`
  min-width: 480px;
  ${props => props.mode == 'fullscreen' ? 'height: 100%;' : null}
  ${props => props.mode == 'fullscreen' ? null : 'max-height: calc(100vh - 169px);'}
  background-color: #000;
  position: relative;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .video-overlay {
    position: absolute;
    cursor: pointer;
    background-color: transparent;
    bottom: 0px;
    left: 0;
    right: 0;
    top: 0;
  }

  video {
    width: 100%;
    max-width: 100%;
    ${props => props.mode == 'fullscreen' ? null : 'max-height: calc(100vh - 169px);'}
  }

  .video-controls {
    transition: bottom 0.2s linear;
    background-image: linear-gradient(transparent, black);
    color: white;
    position: absolute;
    bottom: -52px;
    left: 0;
    right: 0;
    width: 100%;
    padding: 0 12px;

  }
`;

let onMouseMove;
let timeoutId;

function VideoPlayer({ video, toggleMode, mode }) {
  const videoRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [show, setShow] = useState(null);

  window.videoRef = videoRef;
  function togglePlayPause(e, playOrPause) {
    e.preventDefault();
    e.stopPropagation();
    const { current } = videoRef;
    if (playOrPause === 'pause') {
      current.pause();
      setPlay(false);
    } else if (playOrPause === 'play' || current.paused || current.ended) { 
      current.play();
      setPlay(true);
    } else {
      current.pause();
      setPlay(false);
    }
  }

  useEffect(() => {
    const { current } = videoRef;
    try {
      let time = parseInt(window.location.href.split("?")[1]);
      if (time > (current.duration)) {
        time = 0;
      }
      current.addEventListener('loadedmetadata', function onLoad() {
        current.currentTime = time;
        current.removeEventListener('loadedmetadata', onLoad);
      });
    } catch(e) {
      current.currentTime = 0;
    }
    return (() => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (onMouseMove) {
        document.removeEventListener('mousemove', onMouseMove);
      }
    });
  }, []);

  function onHover() {
    onMouseMove = function() {
      setShow(true);
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      timeoutId = setTimeout(() => {
        setShow(null);
        timeoutId = null;
      }, 3000);
    };
    document.addEventListener('mousemove', onMouseMove);
  }

  function offHover() {
    document.removeEventListener('mousemove', onMouseMove);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    setShow(null);
    onMouseMove = null;
  }

  return (
    <Video 
      mode={mode}
      onMouseEnter={onHover} 
      onMouseLeave={offHover}>
      <video
        ref={videoRef}
        poster={video.thumbnail} >
        <source src={video.video} type="video/mp4" />
      </video>
      <div
        className="video-overlay"
        onClick={togglePlayPause}>
      </div>
      {videoRef.current ? (
        <div
        className="video-controls"
        style={!play || show ? {bottom: '0'} : {}}>
          <ProgressBar 
            togglePlayPause={togglePlayPause}
            videoRef={videoRef.current} 
            play={play}/>
          <PlayerButtons 
            play={play}
            videoRef={videoRef.current}
            togglePlayPause={togglePlayPause}
            toggleMode={toggleMode}
            mode={mode}/>
        </div> ) : null
      }
    </Video>
  );
}

export default VideoPlayer;