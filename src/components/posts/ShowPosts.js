import React, { useEffect, useState } from 'react';
import localAPI from '../api/localAPI';
import DeletePost from '../posts/DeletePost';

const ShowPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    localAPI.get('/posts/')
      .then((posts) => setPosts(posts.data));
  }, [posts]);

  return (
    posts.map((post) => (
    <div>
      <div>Author: {post.authorId}</div>
      <div>Content: {post.content}</div>
      <div>Likes: {post.likes.length}</div>
      <div>Created date: {post.createdDate}</div>
      <DeletePost
        postId={post._id}
        onDelete={() => setPosts(posts.filter((p) => p._id !== post._id))}
      />
    </div>
    ))
  )
};

export default ShowPosts;
