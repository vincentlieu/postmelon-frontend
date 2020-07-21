import React from 'react';
import localAPI from '../api/localAPI';

const DeletePost = ({ postId, onDelete }) => {
  
  function deletePost() {
    localAPI.delete(`/posts/${postId}`)
      .then(onDelete)
  }

  return (
    <button onClick={deletePost}>
      X
    </button>
  );
}

export default DeletePost;
