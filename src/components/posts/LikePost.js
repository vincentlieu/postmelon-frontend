import React from 'react';
import localAPI from '../../api/localAPI';
import { Button } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { useGlobalState } from '../../config/GlobalState';

const LikePost = ({ postId }) => {
  
  const { dispatch, store } = useGlobalState();
  const { posts } = store;

    function onLike() {
      localAPI.put(`/posts/${postId}/like`)
      .then((post) => console.log(post))
    }

    return (
      <Button
        onClick={onLike}
        startIcon={<ThumbUpIcon />}
        color='default'
        fullWidth>
        Like
      </Button>
    );
}

export default LikePost