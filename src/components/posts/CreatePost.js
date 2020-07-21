import React, { useState } from 'react';
import localAPI from '../api/localAPI';

const CreatePost = () => {

    const [post, setPost] = useState("")

    function onSubmit() {
        localAPI.post('/posts/', {
            content: post
        })
        .then(setPost(""))
    }

    return (
        <div>
            <input
                type="text"
                value={post}
                onChange={e => setPost(e.target.value)}>
            </input>
            <button
                onClick={onSubmit}>Post
            </button>
        </div>
    )
}

export default CreatePost;