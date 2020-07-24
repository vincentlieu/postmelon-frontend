import React, {useState} from 'react';
import localAPI from '../../api/localAPI'
import { TextField, Box} from '@material-ui/core';

const CreateComments = ({ postId }) => {

    const [newComment, setNewComment] = useState('')
    const [error, setError] = useState('');

    function onSubmit(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
            if (newComment !== '\n') {
                localAPI
                    .post(`/posts/${postId}/comments`, {
                        content: newComment,
                    })
                    .then(setNewComment(''))
                    .then(setError(''))
                    .catch((error) => setError(error))
            } else {
                setNewComment('')
                setError("Content cannot be empty.")
            }
        
          }
    }

    return (
      <Box marginTop={1}>
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
          onKeyUp={onSubmit}
        />
      </Box>
    );
};

export default CreateComments;
