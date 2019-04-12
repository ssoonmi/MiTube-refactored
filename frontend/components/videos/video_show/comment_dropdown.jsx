import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../../../actions/comment_actions';
import styled from 'styled-components';
import { ThemeContext } from '../../../context/theme_context';


const Dropdown = styled.ul.attrs(({ theme }) => ({
  backgroundColor: theme.background,
  hoverBackgroundColor: theme.menuItemHoverBackground,
  color: theme.smallLink,
}))`
  display: flex;
  flex-direction: column;
  padding: 8px 0px;
  position: absolute;
  top: 40px;
  right: 0;
  background-color: ${props => props.backgroundColor};
  z-index: 700;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);

  li {
    cursor: pointer;
    color: ${props => props.color};
    display: flex;
    align-items: center;
    padding: 0 36px 0 16px;
    min-height: 36px;

    div {
      margin-right: 16px;
      font-size: 20px;
    }

    &:hover {
      background-color: ${props => props.hoverBackgroundColor};
    }

  }
`;

function CommentDropdown({ comment, user, sameUser, deleteComment, toggleDropdown, updateComment }) {
  const theme = useContext(ThemeContext);

  function deleteUserComment() {
    deleteComment(comment.id, comment.video_id);
    toggleDropdown();
  }

  if (sameUser) {
    return (
      <Dropdown theme={theme}>
        <li onClick={updateComment} >
          <div><i className="fas fa-pen"></i></div>
          <span>Update</span>
        </li>
        <li onClick={deleteUserComment} >
          <div><i className="fas fa-trash-alt"></i></div>
          <span>Delete</span>
        </li>
      </Dropdown>
    );
  } else {
    return (
      <Dropdown>
        <li>
          <div><i className="fab fa-font-awesome-flag"></i></div>
          <span>Report</span>
        </li>
      </Dropdown>
    );
  }
}

const msp = (state, ownProps) => {
  return {
    sameUser: Boolean(ownProps.user.id == state.session.id)
  };
};

const mdp = dispatch => {
  return {
    deleteComment: (id, videoId) => dispatch(deleteComment(id, videoId)),
  };
};

export default connect(msp, mdp)(CommentDropdown);