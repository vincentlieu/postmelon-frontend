import React, { useState } from 'react';
import localAPI from '../../api/localAPI';
import { Button, TextField, Box, Container } from '@material-ui/core';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [error, setError] = useState('');

    function onSubmit() {
        if (post) {
            localAPI
                .post('/posts/', { content: post })
                .then(setPost(''))
                .catch((error) => setError(error.response.data.errors[0].msg))
        } else {
            setError("Post content required.")
        }
  }
    
  return (
    <div>
      <Container disableGutters={true}>
        <Box width={1} display='flex' justifyContent='center'>
        <TextField
            error={error ? true : false}
            helperText={error}
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
    </div>
  );
};

export default CreatePost;
