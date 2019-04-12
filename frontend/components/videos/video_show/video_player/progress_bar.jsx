import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  display: flex;
  width: 100%;
  height: 16px;
  cursor: pointer;
  align-items: flex-end;

  &:hover > div {
    height: 6px;
  }
  
  > div {
    background-color: rgba(255, 255, 255, 0.3);
    height: 3px;
    width: 100%;
    transition: height 0.1s linear;
    position: relative;
  }

  .loaded-bar {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 1);
    height: 100%;
  }

  .progress-bar-red {
    height: 100%;
    position: relative;
    background-color: red;

    .transparent-circle {
      height: 20px;
      width: 20px;
      position: absolute;
      right: -10px;
      bottom: -7px;
      display: flex;
      align-items: center;
      justify-content: center;
      display: none;

      .red-circle {
        background-color: red;
        height: 13px;
        width: 13px;
        border-radius: 50%;
      }
    }
  }

  &:hover {
    .progress-bar-red {

      .transparent-circle {
        display: flex;
      }
    }
  }
`;

function ProgressBar({ videoRef, play, hover, togglePlayPause }) {
  const [progress, setProgress] = useState(videoRef.currentTime / videoRef.duration);
  const [loaded, setLoaded] = useState(0);
  const [drag, setDrag] = useState(false);
  // const [wasPaused, setWasPaused] = useState(true);
  // const [dragProgressFunction, setDragProgressFunction] = useState(null);
  const barRef = useRef(null);

  useEffect(() => {
    function onLoading() {
        const bufferedTime = (videoRef.buffered.end(videoRef.buffered.length - 1)) / videoRef.duration; 
        setLoaded(bufferedTime);
      }
    function onTimeUpdate() {
      
      if (!drag) {
        setProgress(videoRef.currentTime / videoRef.duration);
        onLoading();
      }
    }
    videoRef.addEventListener('timeupdate', onTimeUpdate);
    videoRef.addEventListener('progress', onLoading);
    return (() => {
      videoRef.removeEventListener('timeupdate', onTimeUpdate);
      videoRef.removeEventListener('progress', onLoading);
    });
  }, [videoRef]);

  useEffect(() => {
    function mouseDownHandler(e) {
      let wasPaused = (videoRef.paused || videoRef.ended);
      togglePlayPause(e, 'pause');
      setDrag(true);

      function dragHandler(e) {
        e.preventDefault();
        const bar = barRef.current.getBoundingClientRect();
        const x = e.clientX - bar.left; //x position within the element.
        let ratio = x / barRef.current.offsetWidth;
        if (ratio >= 1) ratio = 1;
        if (ratio < 0) ratio = 0;
        setProgress(ratio);
      }

      document.addEventListener('mousemove', dragHandler, false);

      document.addEventListener('mouseup', function mouseUpHandler(e) {
        const bar = barRef.current.getBoundingClientRect();
        const x = e.clientX - bar.left; //x position within the element.
        let ratio = x / barRef.current.offsetWidth;
        if (ratio >= 1) {
          ratio = 1;
          wasPaused = 'paused';
        }
        if (ratio < 0) ratio = 0;
        videoRef.currentTime = ratio * videoRef.duration;
        document.removeEventListener('mousemove', dragHandler, false);
        document.removeEventListener('mouseup', mouseUpHandler, false);
        togglePlayPause(e, wasPaused ? 'pause' : 'play');
        setDrag(false);
      }, false);
    }
    if (barRef.current) {
      barRef.current.addEventListener('mousedown', mouseDownHandler);
      return (() => {
        barRef.current.removeEventListener('mousedown', mouseDownHandler);
      });
    }
  }, [barRef]);

  return (
    <Bar 
      ref={barRef}>
      <div style={drag ? {height: `6px`} : {}}>
        <div 
          className="loaded-bar"
          style={videoRef ?
            { width: `${loaded * 100}%` } :
            {}
          }>
        </div>
        <div
          className="progress-bar-red"
          style={videoRef ?
            { width: `${progress * 100}%` } :
            {}
          }>
          <div className="red-bar"></div>
          <div 
            className="transparent-circle"
            style={drag ? { display: 'flex' } : {}}>
            <div
              className="red-circle"
              draggable
              onDragOver={e => e.preventDefault()}
              onDrop={e => e.preventDefault()}>
            </div>
          </div>
        </div>
      </div>
    </Bar>
  );
}

export default ProgressBar;