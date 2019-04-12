import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ProfileButton from '../../util/profile_button';
import { timeAgo } from '../../util/helper_functions';
import CommentDropdown from './comment_dropdown';
import EditCommentForm from './edit_comment_form';
import { ThemeContext } from '../../../context/theme_context';

const Li = styled.li.attrs(({ theme }) => ({
  smallTextColor: theme.smallLink,
}))`
  display: flex;
  margin-bottom: 16px;
  position: relative;

  .profile-button-container {
    margin-right: 16px;
  }

  .user-info {
    display: flex;
    align-items: flex-end;
    margin-bottom: 4px;

    h5 {
      font-weight: bold;
      margin-right: 4px;
    }

    span {
      font-size: 13px;
      color: ${props => props.smallTextColor};
    }
  }

  .comment-info {
    width: 100%;
  }

  .comment-body {
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }

  .dropdown {
    display: flex;
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    cursor: pointer;

    .icon {
      display: none;
      color: gray;

    }

    &:hover .icon {
      display: block;
    }
  }
`;

function CommentIndexItem({ comment, user, toggleDropdownShown, dropdownShown }) {
  const theme = useContext(ThemeContext);
  const [dropdown, setDropdown] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!dropdownShown) {
      setDropdown(false);
    }
  }, [dropdownShown]);

  function toggleDropdown() {
    setDropdown(!dropdown);
    toggleDropdownShown();
  }

  if (edit) {
    return (
      <Li theme={theme}>
        <EditCommentForm comment={comment} toggleEdit={() => setEdit(false)} />
      </Li>
    );
  }

  return (
    <Li theme={theme}>
      <div className="profile-button-container">
        <ProfileButton size={"40px"} image={user.image} />
      </div>
      <div className="comment-info">
        <div className="user-info">
          <Link to={`/users/user.id`}><h5>{user.name}</h5></Link>
          <span>
            {timeAgo(comment.created_at)}
            {comment.created_at != comment.updated_at ? ' (edited)' : null}
          </span>
        </div>
        <div className="comment-body">
          {comment.body}
        </div>
      </div>
      <div className="dropdown" onClick={toggleDropdown}>
        <div className="icon" style={dropdown ? {display: 'block'} : {}}>
          <i className="fas fa-ellipsis-v"></i>
        </div>
      </div>
      {(dropdown && dropdownShown) ? (
        <CommentDropdown
          comment={comment}
          user={user}
          toggleDropdown={toggleDropdownShown}
          updateComment={() => {
            setEdit(true);
            toggleDropdown();
          }} />
      ) : null}
    </Li>
  );
}

export default CommentIndexItem;