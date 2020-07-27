import React, { useState } from 'react';
import localAPI from '../../api/localAPI';
import { TextField, Box, Button } from '@material-ui/core';
import { useGlobalState } from '../../config/GlobalState';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    height: '100%',
    width: '100%',
  },
}));

const CreateComments = ({ postId }) => {
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  const { dispatch, store } = useGlobalState();
  const { posts } = store;

  const classes = useStyles();

  function onSubmit() {
    if (newComment) {
      localAPI
        .post(`/posts/${postId}/comments`, {
          content: newComment,
        })
        .then((post) => {
          const otherPosts = posts.filter((p) => p._id !== post.data._id);
          dispatch({
            type: 'addComment',
            data: [post.data, ...otherPosts],
          });
        })
        .then(setNewComment(''))
        .then(setError(''))
        .catch((err) => setError(error));
    } else {
      setNewComment('');
      setError('Content cannot be empty.');
    }
  }

  return (
    <Box marginTop={1} display='flex'>
        <TextField
          size='small'
          fullWidth={true}
          error={error ? true : false}
          label={error ? error : null}
          multiline={true}
          rows={2}
          rowsMax={2}
          variant='outlined'
          type='text'
          placeholder='Say something...'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
      <Box ml={1}>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={onSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default CreateComments;
