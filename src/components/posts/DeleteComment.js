import React from 'react';
import localAPI from '../../api/localAPI';
import MenuItem from '@material-ui/core/MenuItem';
import { useGlobalState } from '../../config/GlobalState';

const DeleteComment = ({ postId, commentId }) => {
  const { dispatch, store } = useGlobalState();
  const { posts } = store;

  function removeComment() {
      localAPI.delete(`/posts/${postId}/comments/${commentId}`).then((post) => {
      const otherPosts = posts.filter((p) => p._id !== post.data._id);
      dispatch({
        type: 'deleteComment',
        data: [post.data, ...otherPosts],
      });
    });
  }

  return (
    <MenuItem key={'option'} onClick={removeComment}>
      Delete Comment
    </MenuItem>
  );
};

export default DeleteComment;
