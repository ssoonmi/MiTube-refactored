import React, { useContext, useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import VideoListItem from './video_list_item';
import { ThemeContext } from '../../context/theme_context';
import { WidthContext } from '../../context/width_context';

const List = styled.div.attrs(({ theme }) => ({
  iconColor: theme.iconColor,
  backgroundColor: theme.background,
}))`
  width: 100%;
  overflow: hidden;
  margin: 24px 0px;

  > ul {
    display: flex;
    position: relative;
    transition: left 0.3s linear;

    > li {
    padding-right: 4px;
    width: fit-content;

      &:last-of-type {
        padding-right: 0px;
      }
    }
  }
  
`;

const ScrollButton = styled.div.attrs(({ theme }) => ({
  iconColor: theme.iconColor,
  iconBackground: theme.iconBackground,
}))`
  position: absolute;
  height: 118px;
  top: 0px;
  display: flex;
  align-items: center;
  user-select: none;

  .scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    z-index: 2;
    color: ${props => props.iconColor};
    font-weight: 300;
    background-color: ${props => props.iconBackground};
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3), 0 0 4px rgba(0, 0, 0, 0.2);
    top: 0;
    cursor: pointer;
  }
  
  &.left {
    left: -20px;
  }

  &.right {
    right: -20px;
  }

`;

function VideoList({ videoIds }) {
  const theme = useContext(ThemeContext);
  const scrollRef = useRef(null);
  const containerRef = useRef(null);  
  const [left, setLeft] = useState(0);
  const [hideLeft, setHideLeft] = useState(false);
  const [hideRight, setHideRight] = useState(false);
  const width = useContext(WidthContext);

  function scroll(scrollLeft) {
    return function(e) {
      e.preventDefault();
      if (scrollLeft) {
        const scrollDiff = left + containerRef.current.offsetWidth;
        const max = 0 < (scrollDiff) ? 0 : scrollDiff;
        setLeft(max);
      } else {
        const scrollWidth = scrollRef.current.scrollWidth;
        const containerWidth = containerRef.current.offsetWidth;
        const scrollDiff = left - containerWidth;
        const max = -scrollDiff >= (scrollWidth - containerWidth) ? -(scrollWidth - containerWidth) : scrollDiff;
        setLeft(max);
      }
    };
  }

  useEffect(() => {
    if (scrollRef.current && containerRef.current) {
      setHideRight(-left >= scrollRef.current.scrollWidth - containerRef.current.offsetWidth);
      setHideLeft(left == 0);
    }
  }, [left, scrollRef, containerRef, width]);

  useEffect(() => {
    if (scrollRef.current && containerRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;
      const max = -left >= (scrollWidth - containerWidth) ? -(scrollWidth - containerWidth) : left;
      if (left < max) {
        setLeft(max);
      }
    }
  }, [width]);

  const videoLis = videoIds.map((videoId, idx) => {
    return (
      <li key={idx}>
        <VideoListItem videoId={videoId} />
      </li>
    );
  });

  return (
    <div style={{position: 'relative'}}>
      <List theme={theme} ref={containerRef}>
        <ul style={{ left: `${left}px` }} ref={scrollRef}>
          {videoLis}
        </ul>
      </List>
      <ScrollButton 
        theme={theme} 
        style={hideLeft ? { display: 'none' } : {}} 
        className="left" 
        onClick={scroll(true)}>
        <div className="scroll-button">&lt;</div>
      </ScrollButton>
      <ScrollButton 
        theme={theme} 
        style={hideRight ? { display: 'none' }: {}} 
        className="right" 
        onClick={scroll(false)}>
        <div className="scroll-button">&gt;</div>
      </ScrollButton>
    </div>
  );
}

export default VideoList;