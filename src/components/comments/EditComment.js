import React from 'react';
import localAPI from '../../api/localAPI';
import SaveIcon from '@material-ui/icons/Save';
import { IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { useGlobalState } from '../../config/GlobalState';

const EditComment = ({
  postId,
  commentId,
  commentContent,
  commentFlag,
  setNewCommentContent,
}) => {
  const { dispatch, store } = useGlobalState();
  const { posts } = store;

  function onSubmit() {
    localAPI
      .put(`/posts/${postId}/comments/${commentId}`, {
        content: commentContent,
      })
      .then((post) => {
        const otherPosts = posts.filter((p) => p._id !== post.data._id);
        dispatch({
          type: 'editComment',
          data: [post.data, ...otherPosts],
        });
      })
      .then(setNewCommentContent)
      .then(commentFlag);
  }

  return (
    <div>
      {commentContent && <IconButton color='primary' onClick={onSubmit}>
        <SaveIcon />
      </IconButton>}
      <IconButton onClick={commentFlag}>
        <CancelIcon />
      </IconButton>
    </div>
  );
};

export default EditComment;
