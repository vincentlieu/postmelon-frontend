import React, {useState} from 'react';
import localAPI from '../../api/localAPI'
import { TextField, Box} from '@material-ui/core';

const CreateComments = ({ postId }) => {

    const [newComment, setNewComment] = useState("")

    function onSubmit(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
            localAPI.post(`/posts/${postId}/comments`, {
                content: newComment
            })
                .then(setNewComment(""))
        }
    }

    return (
        <Box marginTop={1}>
            <TextField
                size='small'
                multiline={true}
                fullWidth={true}
                rows={3}
                rowsMax={3}
                variant='outlined'
                type='text'
                placeholder='Say something...'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyUp={onSubmit} 
                />
        </Box>
  )
};

export default CreateComments;
