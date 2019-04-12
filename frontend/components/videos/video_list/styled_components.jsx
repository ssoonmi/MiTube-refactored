import styled from 'styled-components';

export const List = styled.div.attrs(({ theme }) => ({
  border: theme.videoListBorder
}))`
  border-bottom: 1px solid ${props => props.border};
  position: relative;
  z-index: 1;

  &:last-of-type {
    border-bottom: 0px;
  }
`;

export const Header = styled.div.attrs(({ theme }) => ({
  smallLink: theme.smallLink,
}))`
  margin-top: 24px;
  height: fit-content;
  overflow: hidden;

  > div {
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h4 {
      font-weight: 500;
      font-size: 16px;
    }

    > .header-info {
      display: flex;
      align-items: center;

      > a {
        display: flex;
        align-items: center;

        .icon {
          width: 32px;
          height: 32px;
          margin-right: 8px;
        }

      }

      > span {
        margin-left: 8px;
        color: ${props => props.smallLink};
      }

      .description {
        max-width: 615px;
        color: ${props => props.descriptionColor};
        margin-top: 8px;
      }

      .play-all {
        margin-left: 16px;
        padding: 6px 16px;
        color: ${props => props.smallLink};
        cursor: pointer;

        > span {
          margin-left: 8px;
        }
      }
    }

    > .subscribe-container {
      justify-self: flex-end;
    }

    
  }
`;