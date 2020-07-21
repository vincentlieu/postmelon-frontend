import React, { useState } from 'react';
import localAPI from '../../api/localAPI';
import { Button, TextField, Box, Container } from '@material-ui/core';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [error, setError] = useState('');

  function onSubmit() {
    localAPI
      .post('/posts/', { content: post })
      .then(setPost(''))
      .catch((error) => setError(error.response.data.message));
  }

  return (
    <div>
      <Container disableGutters={true}>
        <Box width={1} display='flex' justifyContent='center' align>
          <TextField
            fullWidth={true}
            variant='outlined'
            type='text'
            value={post}
            onChange={(e) => setPost(e.target.value)}></TextField>
        </Box>
        <Box display='flex' justifyContent='center'>
          <Button onClick={onSubmit} color='primary'>
            Post
          </Button>
        </Box>
      </Container>
      <div>{error && <p>{error}</p>}</div>
    </div>
  );
};

export default CreatePost;
