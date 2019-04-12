import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const Controls = styled.div.attrs(() => ({

}))`
  display: flex;
  align-items: center;

  .icon {
    font-size: 18px;
    height: 100%;
    width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .slider {
    height: 4px;
    width: 0px;
    background-color: gray;
    cursor: pointer;
    transition: width 0.1s linear;

    .white-slider {
      position: relative;
      background-color: white;
      overflow: visible;
      height: 100%;

      .circle {
        position: absolute;
        background-color: white;
        width: 10px;
        height: 10px;
        top: -3px;
        right: -5px;
        border-radius: 50%;
      }
    }

  }
`;

function VolumeControl({ videoRef, buttonsHover }) {
  const [drag, setDrag] = useState(false);
  const [hover, setHover] = useState(false);
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(1);
  const volumeRef = useRef(null);

   useEffect(() => {
     function mouseDownHandler(e) {
       setDrag(true);

       function dragHandler(e) {
         e.preventDefault();
         const bar = volumeRef.current.getBoundingClientRect();
         const x = e.clientX - bar.left; //x position within the element.
         let ratio = x / volumeRef.current.offsetWidth;
         if (ratio >= 1) ratio = 1;
         if (ratio < 0) ratio = 0;
         videoRef.volume = ratio;
         setVolume(ratio);
       }

       document.addEventListener('mousemove', dragHandler, false);

       document.addEventListener('mouseup', function mouseUpHandler(e) {
         const bar = volumeRef.current.getBoundingClientRect();
         const x = e.clientX - bar.left; //x position within the element.
         let ratio = x / volumeRef.current.offsetWidth;
         if (ratio >= 1) {
           ratio = 1;
         }
         if (ratio < 0) ratio = 0;
         if (ratio > 0) setPrevVolume(ratio);
         videoRef.volume = ratio;
         setVolume(ratio);
         document.removeEventListener('mousemove', dragHandler, false);
         document.removeEventListener('mouseup', mouseUpHandler, false);
         setDrag(false);
       }, false);
     }
    if (volumeRef.current) {
      volumeRef.current.addEventListener('mousedown', mouseDownHandler);
      return (() => {
        volumeRef.current.removeEventListener('mousedown', mouseDownHandler);
      });
    } 
  }, [volumeRef]);

  let volumeIcon;
  if (volume == 0) {
    volumeIcon = (<i className="fas fa-volume-mute"></i>);
  } else if (volume < 0.5) {
    volumeIcon = (<i className="fas fa-volume-down"></i>);
  } else {
    volumeIcon = (<i className="fas fa-volume-up"></i>);
  }

  function iconClickHandler(e) {
    e.preventDefault();
    if (videoRef.volume == 0) {
      videoRef.volume = prevVolume;
      setVolume(prevVolume);
    } else {
      videoRef.volume = 0;
      setVolume(0);
    }
  }

  useEffect(() => {
    if (!buttonsHover) {
      setHover(false);
    }
  }, [buttonsHover])

  function onHover(e) {
    setHover(true);
  }
  
  return (
    <Controls>
      <button 
        className="icon"
        onClick={iconClickHandler}
        onMouseEnter={onHover}>
        {volumeIcon}
      </button>
      <div 
        className="slider" 
        ref={volumeRef}
        style={hover && buttonsHover ? { width: '52px' } : {}}>
        <div 
          style={{ width: `${volume * 100}%` }}
          className="white-slider">
          <div 
            className="circle"
            style={hover && buttonsHover ? {} : { display: 'none' }}>>
          </div>
        </div>
      </div>
    </Controls>
  );
}

export default VolumeControl;