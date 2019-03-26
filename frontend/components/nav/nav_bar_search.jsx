import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/theme_context';

const NavSearch = styled.form.attrs(({ theme }) => ({
  searchButtonBorder: theme.searchButtonBorder, 
  searchButtonBackground: theme.searchButtonBackground,
  name: theme.name,
  blue: theme.blue
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  border-radius: 2px;
  width: 100%;
  max-width: 400px;

  input[type=text] {
    border-radius: 2px 0 0 2px;
    border: 1px solid ${props => props.searchButtonBorder};
    padding: 2px 6px;
    height: inherit;
    width: inherit;

    &:focus {
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
      border: 1px solid ${props => props.blue};
    }
  }

  > div {
    border-radius: 0 2px 2px 0;
    border: 1px solid ${props => props.searchButtonBorder};
    border-left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 65px;
    padding: 1px 7px;
    height: inherit;
    background-color: ${props => props.searchButtonBackground};
    cursor: pointer;
    color: ${props => props.name == 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'};

    &:hover {
      ${props => props.name == 'light' ? 'box-shadow: 0px 0px 1px -0.5px lightgray;': ''}
      ${props => props.name == 'light' ? 'background-color: rgb(230, 230, 230);': ''}
      color: ${props => props.name == 'light' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
    }
  }
`;

export default function NavBarSearch() {
  const theme = useContext(ThemeContext);
  return (
    <NavSearch theme={theme}>
      <input type="text" placeholder="Search" />
      <input type="submit" style={{ display: "none" }} />
      <div><i className="fab fa-sistrix"></i></div>
    </NavSearch>
  );
}