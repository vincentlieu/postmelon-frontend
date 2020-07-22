import React from 'react';
import localAPI from '../../api/localAPI';
import { Button } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const LikePost = ({ postId }) => {

    function onLike() {
        localAPI.put(`/posts/${postId}/like`)
    }

    return (
      <Button onClick={onLike} startIcon={<ThumbUpIcon />} color='default'>
        Like
      </Button>
    );
}

export default LikePost