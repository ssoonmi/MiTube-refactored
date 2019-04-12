import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FullScreenButton from './player_buttons/fullscreen_button';
import PlayButton from './player_buttons/play_button';
import VolumeControl from './player_buttons/volume_control';
import NextButton from './player_buttons/next_button';

const Buttons = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .right, .left {
    display: flex;
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 36px;
    font-size: 1.8em;
    cursor: pointer;
    color: rgb(238, 238, 238);

    &:hover {
      color: white;
      
      .large, .small {
        border-color: white;
      }
    }
  }

  .large {
    border-radius: 1px;
    width: 21px;
    height: 14px;
    border: 2px solid rgb(238, 238, 238);
  }

  .small {
    border-radius: 1px;
    width: 16px;
    height: 8px;
    border: 2px solid rgb(238, 238, 238);
  }

  .play-button {
    font-size: 2.0em;
    width: 46px;
  }

  .fullscreen {
    font-size: 1.8em;
  }

  .next {
    font-size: 1.6em;
  }

  .time {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 8px;

    > div {
      background-color: black;
      font-size: 1.2em;
    }
  }

`;

function calculateHours(currentTime) {
  const time = currentTime % (60 * 60);
  return Math.floor(time / 3600);
}

function calculateSeconds(currentTime) {
  let time = currentTime % (60 * 60);
  if (time >= 3600) {
    time = time - hours * 3600;
  }
  return Math.ceil(time - (Math.floor(time / 60) * 60));
}

function calculateMinutes(currentTime) {
  let time = currentTime % (60 * 60);
  if (time >= 3600) {
    time = time - hours * 3600;
  }
  return Math.floor(time / 60);
}

function Time({ videoRef, duration }){
  const [seconds, setSeconds] = useState(calculateSeconds(videoRef.currentTime));
  const [minutes, setMinutes] = useState(calculateMinutes(videoRef.currentTime));
  const [hours, setHours] = useState(calculateHours(videoRef.currentTime));

  useEffect(() => {
    videoRef.addEventListener('timeupdate', function () {
      setSeconds(calculateSeconds(videoRef.currentTime));
      setMinutes(calculateMinutes(videoRef.currentTime));
      setHours(calculateHours(videoRef.currentTime));
    });
  }, []);

  return (
    <div className="time">
      <div>
        {hours ? `${hours}:` : null}{minutes}:{seconds < 10 ? '0' : null}{seconds}
        {' / '}
        {duration[2] ? `${duration[2]}:` : null}{duration[1]}:{duration[0]}
      </div>
    </div>
  )
}

function PlayerButtons({ 
  togglePlayPause, 
  play, 
  videoRef,
  toggleMode,
  mode
}) {
  const [hover, setHover] = useState(false);
  let duration = [
    calculateSeconds(videoRef.duration),
    calculateMinutes(videoRef.duration), 
    calculateHours(videoRef.duration)
  ];

  return (
    <Buttons>
      <div 
        className="right"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
        <PlayButton 
          play={play} 
          togglePlayPause={togglePlayPause} />
        <NextButton />
        <VolumeControl 
          videoRef={videoRef}
          buttonsHover={hover} />
        <Time 
          videoRef={videoRef} 
          duration={duration}/>
      </div>
      <div className="left">
        <FullScreenButton 
          toggleMode={toggleMode}
          mode={mode}/>
      </div>
    </Buttons>
  )
}

export default PlayerButtons;