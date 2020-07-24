import React from 'react';
import localAPI from '../../api/localAPI';
import MenuItem from '@material-ui/core/MenuItem';

const DeletePost = ({ postId, onDelete }) => {

  function deletePost() {
    localAPI.delete(`/posts/${postId}`).then(onDelete);
  }

  return (
    <MenuItem key={'option'} onClick={deletePost}>
      Delete Post
    </MenuItem>
  );
};

export default DeletePost;
