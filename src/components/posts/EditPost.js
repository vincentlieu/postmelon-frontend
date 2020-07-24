import React from 'react';
import localAPI from '../../api/localAPI'
import SaveIcon from '@material-ui/icons/Save';
import { IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { useGlobalState } from '../../config/GlobalState';

const EditPost = ({ value, postId, confirmChange, setNewPostContent, cancelChange}) => {
    const { dispatch, store } = useGlobalState();
    const { posts } = store;

  function onSubmit() {
    localAPI.put(`/posts/${postId}`, { content: value })
      .then((post) => {
        const otherPosts = posts.filter((p) => p._id !== post.data.postId);
        dispatch({
          type: 'editPost',
          data: [post.data.post ,...otherPosts]
        })
      })
      .then(confirmChange)
      .then(setNewPostContent)
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