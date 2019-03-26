import styled from 'styled-components';

export const NavIcon = styled.li`
  display: flex;
  min-width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 8px;
  cursor: pointer;

  &> i {
    height: 1em;
  }

  &:active {
    background-color: rgba(150, 150, 150, 0.5);
  }
`;

export const Dropdown = styled.ul.attrs(({ theme }) => ({
  headerBackground: theme.menuHeaderBackground,
  backgroundColor: theme.background,
  menuItemHoverBackground: theme.menuItemHoverBackground
}))`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: ${props => props.backgroundColor};
  width: 300px;
  z-index: 700;
  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.15);

  > div {
    display: flex;
    padding: 16px;
    height: 72px;
    cursor: pointer;
    background-color: ${props => props.headerBackground};

    > div {
      margin-left: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      > div:first-child {
        font-size: 16px;
        font-weight: 500;
      }
    }
  }

  li {
    cursor: pointer;
  }

  section {
    margin-top: 8px;
    li {
      height: 40px;
      padding: 0px 36px 0px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      user-select: none;

      &:hover {
        background-color: ${props => props.menuItemHoverBackground};
      }
    }
  }

  
`;