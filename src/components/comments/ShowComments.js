import React from 'react';
import CreateComment from './CreateComment';
import Comment from './Comment';

const Comments = ({ postComments, postId }) => {

  function renderComment() {
    return (
      postComments.map((comment) => (
      <Comment comment={comment} postId={postId}></Comment>
    )))
  }

    return (
      <div>
        <CreateComment postId={postId} />
        {renderComment()}
      </div>
    );
}

export default Comments