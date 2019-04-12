import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import ProfileButton from '../../util/profile_button';
import { ThemeContext } from '../../../context/theme_context';
import { updateComment } from '../../../actions/comment_actions';
import Loader from '../../shared/loader';
import { Form } from './comment_form';

function CommentForm({ loggedIn, updateComment, comment, toggleEdit }) {
  const theme = useContext(ThemeContext);
  const [body, setBody] = useState(comment.body);
  const [disabled, setDisabled] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

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
      updateComment({ 
        body: body, 
        id: comment.id,
        video_id: comment.video_id
      }).then(() => {
        setDisabled(false);
        toggleEdit();
      });
    } else {
      window.location.assign('/auth/google_oauth2');
    }
  }

  function handleCancel(e) {
    e.preventDefault();
    setDisabled(false);
    setShowButtons(false);
    toggleEdit();
  }

  return (
    <Form theme={theme} onSubmit={handleSubmit}>
      <div className="profile-button-container">
        <ProfileButton size={'40px'} />
      </div>
      <div className="text-input">
        <Textarea
          minRows={1}
          value={body}
          placeholder="Add a public comment..."
          onChange={e => setBody(e.target.value)}
          disabled={disabled}
          onFocus={onFocus} />
        {showButtons ? (
          <div className="buttons">
            <input 
              className="save-edit"
              type="submit" 
              value="SAVE" 
              disabled={body == comment.body || disabled} />
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

const mdp = (dispatch) => {
  return {
    updateComment: (newComment) => dispatch(updateComment(newComment))
  };
};

export default connect(msp, mdp)(CommentForm);