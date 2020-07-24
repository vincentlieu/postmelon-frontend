import React, { useState } from 'react';
import localAPI from '../../api/localAPI';
import { Button, TextField, Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalState } from "../../config/GlobalState";

const useStyles = makeStyles((theme) => ({
  createPostContainer: {
    margin: `${theme.spacing(4)}px auto`,
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  createPostBtn: {
    marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1.5),
    width: '100%',
  },
}));

const CreatePost = () => {
  const [post, setPost] = useState("");
  const [error, setError] = useState("");
  const { dispatch, store } = useGlobalState();
  const { posts } = store;
    
  const classes = useStyles();

  function onSubmit() {
    if (post) {
      localAPI
        .post("/posts/", { content: post })
        .then((post) => {
          dispatch({ type: "addPost", data: [post.data, ...posts] });
          setPost("");
        })
        .catch((error) => setError(error.response.data.errors[0].msg));
    } else {
      setError('Post content required.');
    }
  }

  return (
    <div>
      <Paper className={classes.createPostContainer}>
        <TextField
          placeholder='Tell the world something...'
          error={error ? true : false}
          label={error ? error : null}
          fullWidth={true}
          multiline={true}
          rowsMin={3}
          variant='outlined'
          type='text'
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <Box>
          <Button
            className={classes.createPostBtn}
            onClick={onSubmit}
            color='primary'
            variant='contained'>
            Post
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default CreatePost;
