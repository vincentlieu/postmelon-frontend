import React from 'react';
import localAPI from '../../api/localAPI';
import MenuItem from '@material-ui/core/MenuItem';
import { useGlobalState } from '../../config/GlobalState';

const DeletePost = ({ postId }) => {
  const { dispatch, store } = useGlobalState();
  const { posts } = store;

  function deletePost() {
    localAPI.delete(`/posts/${postId}`).then((post) => {
      dispatch({
        type: 'deletePost',
        data: posts.filter((p) => p._id !== post.data.postId),
      });
    });
  }

  return (
    <MenuItem key={'option'} onClick={deletePost}>
      Delete Post
    </MenuItem>
  );
};

export default DeletePost;
