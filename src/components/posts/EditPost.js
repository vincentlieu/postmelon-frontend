import React from 'react';
import localAPI from '../../api/localAPI'
import SaveIcon from '@material-ui/icons/Save';
import { IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

const EditPost = ({ value, postId, confirmChange, setNewPostContent, cancelChange}) => {
  function onSubmit() {
    localAPI.put(`/posts/${postId}`, { content: value }).then(confirmChange).then(setNewPostContent);
  }
    return (
      <div>
        <IconButton onClick={onSubmit} color='primary'>
          <SaveIcon />
        </IconButton>
        <IconButton
        onClick={cancelChange}
        >
          <CancelIcon />
        </IconButton>
      </div>
    );
};

export default EditPost;