import React, { useState } from 'react';
import localAPI from '../../api/localAPI';
import { Button, TextField, Box, Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab'

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
        <Box width={1} display='flex' justifyContent='center'>
          <TextField
            fullWidth={true}
            variant='outlined'
            type='text'
            value={post}
            onChange={(e) => setPost(e.target.value)}></TextField>
        </Box>
        <Box display='flex' justifyContent='center'>
          <Button onClick={onSubmit} color='primary' fullWidth variant='contained'>
            Post
          </Button>
        </Box>
      </Container>
      {error && <Alert variant='filled' severity='error' >{error}</Alert>}
    </div>
  );
};

export default CreatePost;
