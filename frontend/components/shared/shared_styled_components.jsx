import styled from 'styled-components';

export const FormPage = styled.article.attrs(({ theme }) => ({
  boxShadowColor: theme.searchButtonBorder,
  backgroundColor: theme.background,
  blue: theme.blue,
  color: theme.color,
}))`
  padding-top: 30px;

  > section {
    max-width: 750px;
    min-width: fit-content;
    margin: 0 auto;
    padding: 24px;
    background-color: ${props => props.backgroundColor};
    box-shadow: 0 1px 4px -1px ${props => props.boxShadowColor};

    h2 {
      font-size: 1.2rem;
      margin-bottom: 16px;
    }

    > form {
      display: flex;
      flex-direction: column;
      
      input[type=text], input[type=password], textarea {
        margin-bottom: 16px;
        padding: 8px;
        border: 1px solid gray;
        border-radius: 0 2px 0 2px;

        &:focus {
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
          border: 1px solid ${props => props.blue};
        }

        &:disabled {
          opacity: 0.3;
        }
      }

      textarea {
        resize: vertical;
      }

      .flex-row {
        display: flex;

        > * {
          margin-right: 16px;
          width: 100%;

          &:last-of-type {
            margin-right: 0;
          }
        }
      }

      select {
        margin-bottom: 16px;
        font-size: 1rem;
        width: fit-content;
        align-self: center;
        color: ${props => props.color}
        background-color: ${props => props.backgroundColor};

        option {
          padding: 16px;
        }

        &:disabled {
          opacity: 0.3;
        }
      }

      .submit {
        width: fit-content;
        align-self: flex-end;
        display: flex;

        input[type=submit] {
          width: fit-content;
          height: fit-content;
          padding: 5px 8px;
          margin-left: 8px;
          color: white;
          background-color: ${props => props.blue};
          cursor: pointer;

          &:disabled {
            opacity: 0.7;
            cursor: auto;
          }
        }
      }
      
    }
  }
`;