import React, {useState} from 'react';
import localAPI from '../../api/localAPI'

const CreateComments = ({ postId }) => {

    const [newComment, setNewComment] = useState("")

    function onSubmit() {
        localAPI.post(`/posts/${postId}/comments`, {
            content: newComment
        })
        .then(setNewComment(""))
    }

    return (
        <>
        <input type='text' value={newComment} onChange={(e)=> setNewComment(e.target.value)}></input>
            <button onClick={onSubmit}>New</button>
        </>
  )
};

export default CreateComments;
