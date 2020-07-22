import React from 'react';
import localAPI from '../../api/localAPI';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

const DeletePost = ({ postId, onDelete }) => {
  
  function deletePost() {
    localAPI.delete(`/posts/${postId}`)
      .then(onDelete)
  }

  return (
    <IconButton onClick={deletePost}> 
      <DeleteIcon/>
    </IconButton>
  );
}

export default DeletePost;
