import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, withRouter } from 'react-router-dom';
import { ThemeContext } from '../../../context/theme_context';

const Links = styled.ul.attrs(({ theme }) => ({
  hoverColor: theme.color,
  backgroundColor: theme.html
}))`
  display: flex;
  height: 47px;
  background-color: ${props => props.backgroundColor};
  padding: 0px 107px;
  
  li {
    position:relative;
  }

  .active {
    color: ${props => props.hoverColor};

    &:hover {
      color: ${props => props.hoverColor};
    }
  }

  a {
    color: gray;
    height: 44px;
    display: flex;
    align-items: center;
    padding: 0 32px;
    cursor: pointer;

    &:hover {
      color: ${props => props.hoverColor};
    }
  }
`;

const BottomBorder = styled.div.attrs(({ theme, widthPercent }) => ({
  width: `${widthPercent}%`,
  color: theme.color
}))`
  position: absolute;
  height: 3px;
  background-color: ${props => props.color};
  width: ${props => props.width};
  transition: width 0.1s linear;
  left: auto;
  right: 0px;
  bottom: 0px;
`;

function determineWidth(target, path) {
  const suffix = window.location.href.split(path)[1].split('/')[1];
  if (suffix == target) {
    return 100;
  } else if (!suffix && target == '') {
    return 100;
  } else if (target == 'lastPath') {
    return suffix;
  } else {
    return 0;
  }
}

function ChannelHeaderLinks({ channel, match }) {
  const theme = useContext(ThemeContext);

  const [lastPath, setLastPath] = useState(determineWidth('lastPath', `/channels/${channel.id}`));
  const [home, setHome] = useState(determineWidth('', `/channels/${channel.id}`));
  const [videos, setVideos] = useState(determineWidth('videos', `/channels/${channel.id}`));
  const [about, setAbout] = useState(determineWidth('about', `/channels/${channel.id}`));
  
  useEffect(() => {
    setHome(determineWidth('', `/channels/${channel.id}`));
    setVideos(determineWidth('videos', `/channels/${channel.id}`));
    setAbout(determineWidth('about', `/channels/${channel.id}`));
    setLastPath(determineWidth('lastPath', `/channels/${channel.id}`));
  }, [match]);

  return (
    <Links theme={theme}>
      <li>
        <NavLink exact to={`/channels/${channel.id}/`}>
          Home
            </NavLink>
        <BottomBorder theme={theme} widthPercent={home} />
      </li>
      <li>
        <NavLink to={`/channels/${channel.id}/videos`}>
          Videos
            </NavLink>
        <BottomBorder theme={theme} widthPercent={videos} />
      </li>
      <li>
        <NavLink to={`/channels/${channel.id}/about`}>
          About
            </NavLink>
        <BottomBorder theme={theme} widthPercent={about} />
      </li>
    </Links>
  )
}

export default withRouter(ChannelHeaderLinks);