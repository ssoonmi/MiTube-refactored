import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CommentForm from './comment_form';
import CommentIndexItem from './comment_index_item';
import { fetchComments } from '../../../actions/comment_actions';
import Modal from '../../modal/modal';

const Comments = styled.section`
  grid-area: comments;

  > .header {
    margin-top: 24px;
    margin-bottom: 32px;

    h3 {
      font-size: 16px;
      margin-bottom: 24px;
    }

  }

  > ul {
    
  }

  `;
  
function VideoComments({ video, fetchComments, comments, users }) {
  const [dropdownShown, setDropdownShown] = useState(false);
  function toggleDropdownShown() {
    setDropdownShown(!dropdownShown);
  }
  
  useEffect(() => {
    if (video) {
      fetchComments(video.id);
    }
  }, [video]);

  comments = comments.sort((comment1, comment2) => {
    return new Date(comment2.created_at) - new Date(comment1.created_at);
  });

  const commentLis = comments.map((comment) => {
    const user = users[comment.user_id];
    return (
      <CommentIndexItem 
        key={comment.id} 
        comment={comment} 
        user={user} 
        dropdownShown={dropdownShown}
        toggleDropdownShown={toggleDropdownShown} />
    );
  });

  return (
    <Comments>
      <div className="header">
        <h3>{video.numComments} Comments</h3>
        <CommentForm video={video} />
      </div>
      {dropdownShown ? (
        <Modal clickListener={toggleDropdownShown}/>
      ) : null}
      <ul>
        {commentLis}
      </ul>
    </Comments>
  );
}

const msp = (state, ownProps) => {
  let comments = [];
  if (ownProps.video.commentIds) {
    ownProps.video.commentIds.forEach((id) => {
      if (state.entities.comments[id]) {
        comments.push(state.entities.comments[id])
      }
    });
  }

  return {
    comments,
    users: state.entities.users
  };
};

const mdp = (dispatch) => {
  return {
    fetchComments: (id) => dispatch(fetchComments(id))
  };
};

export default connect(msp, mdp)(VideoComments);