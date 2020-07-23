import React from 'react';
import localAPI from '../../api/localAPI'

const EditPost = ({ value, postId, confirmChange}) => {

    function onSubmit() {
        localAPI.put(`/posts/${postId}`, { content: value })
        .then(confirmChange)
    }
    return(
        <button onClick={onSubmit}>Confirm</button>
    )
}

export default EditPost;