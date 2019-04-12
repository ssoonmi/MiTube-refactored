import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';
import ProfileButton from '../../util/profile_button';
import { ThemeContext } from '../../../context/theme_context';
import { createComment } from '../../../actions/comment_actions';
import Loader from '../../shared/loader';

export const Form = styled.form.attrs(({ theme }) => ({
  blue: theme.blue,
  borderFocusColor: theme.color,
  disabledSubmitColor: theme.menuHeaderBackground,
}))`
  display: flex;
  width: 100%;

  .profile-button-container {
    margin-right: 16px;
  }

  .text-input {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  textarea {
    border-bottom: 1px solid gray;
    padding-bottom: 6px;
    margin-bottom: 8px;
    width: 100%;
    resize: none;

    &:focus {
      border-bottom: 1px solid ${props => props.borderFocusColor};
    }
  }

  .buttons {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;

    input[type=submit], button {
      padding: 10px 16px;
      cursor: pointer;
      margin-left: 8px;
      border-radius: 2px;
    }

    input[type=submit] {
      background-color: ${props => props.blue};
      color: white;
      font-weight: 300;

      &:disabled {
        background-color: ${props => props.disabledSubmitColor};
        cursor: default;
      }

      &.save-edit {
        background-color: transparent;
        color: inherit;
        font-weight: normal;

        &:hover:enabled {
          opacity: 0.5;
        }
      }
    }

    button {
      &:hover {
        opacity: 0.7;
      }
    }
  }

`;

function CommentForm({ loggedIn, createComment }) {
  const theme = useContext(ThemeContext);
  const [comment, setComment] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  function onFocus() {
    if (loggedIn) {
      setShowButtons(true);
    } else {
      window.location.assign('/auth/google_oauth2');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (loggedIn) {
      setDisabled(true);
      createComment({ body: comment }).then(() => {
        setDisabled(false);
        setComment('');
        setShowButtons(false);
      });
    } else {
      window.location.assign('/auth/google_oauth2');
    }
  }

  function handleCancel(e) {
    e.preventDefault();
    setComment('');
    setDisabled(false);
    setShowButtons(false);
  }

  return (
    <Form theme={theme} onSubmit={handleSubmit}>
      <div className="profile-button-container">
        <ProfileButton size={'40px'} />
      </div>
      <div className="text-input">
        <Textarea
          minRows={1}
          value={comment}
          placeholder="Add a public comment..."
          onChange={e => setComment(e.target.value)}
          disabled={disabled}
          onFocus={onFocus} />
        {showButtons ? (
          <div className="buttons">
            <input type="submit" value="COMMENT" disabled={comment.length == 0 || disabled} />
            <button onClick={handleCancel}>CANCEL</button>
            <div>
              <Loader loading={disabled} size={32} sizeUnit={"px"} />
            </div>
          </div>
        ) : null}
      </div>
    </Form>
  )
}

const msp = state => {
  return {
    loggedIn: Boolean(state.session.id)
  };
};

const mdp = (dispatch, ownProps) => {
  return {
    createComment: (comment) => dispatch(createComment(comment, ownProps.video.id))
  };
};

export default connect(msp, mdp)(CommentForm);