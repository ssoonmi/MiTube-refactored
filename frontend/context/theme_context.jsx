import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

export const themes = {
  light: {
    html: "#f9f9f9",
    background: 'white',
    navBackground: "rgba(255, 255, 255, 0.98)",
    color: 'black',
    menuHeaderBackground: 'hsla(0, 0%, 53%, 0.4)',
    menuBackground: 'white',
    menuItemHoverBackground: 'rgba(0, 0, 0, 0.1)',
    searchButtonBorder: '#d3d3d3',
    searchButtonBackground: '#f8f8f8',
    modal: 'rgba(0, 0, 0, 0.5)',
    blue: '#065fd4',
    name: 'light',
    smallLink: 'rgb(96, 96, 96)',
    videoListBorder: 'rgba(0, 0, 0, 0.1)',
    iconColor: '#909090',
    iconBackground: 'white',
  },
  dark: {
    html: "#131313",
    background: '#272727',
    navBackground: "rgba(40, 40, 40, 0.98)",
    color: 'white',
    menuHeaderBackground: 'hsl(0, 0%, 30%)',
    menuBackground: '#1c1c1c',
    menuItemHoverBackground: 'rgba(255, 255, 255, 0.1)',
    searchButtonBackground: 'hsla(0, 0%, 100%, 0.08)',
    searchButtonBorder: 'hsla(0, 0%, 100%, 0.09)',
    modal: 'rgba(0, 0, 0, 0.5)',
    blue: '#3ea6ff',
    name: 'dark',
    smallLink: 'rgba(255, 255, 255, 0.74)',
    videoListBorder: 'rgba(255, 255, 255, 0.1)',
    iconColor: '#909090',
    iconBackground: '#242424',
  },
};

export const ThemeContext = React.createContext(
  themes.light // default value
);

export const useTheme = function(initialTheme) {
  const [theme, setTheme] = useState(themes[initialTheme]);
  return [theme, setTheme];
};

function ThemeProvider({ children, initialTheme }) {
  const theme = themes[initialTheme];

  useEffect(() => {
    document.querySelector('html').style.backgroundColor = theme.html;
    document.querySelector('body').style.color = theme.color;
  }, [initialTheme]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

const msp = (state) => {
  const initialTheme = state.theme || 'light';
  return {
    initialTheme
  };
};

export default connect(msp, null)(ThemeProvider);