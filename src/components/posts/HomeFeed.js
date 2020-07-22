import React, { useEffect, useState } from 'react';
import localAPI from '../../api/localAPI';
import ShowPost from '../posts/ShowPost';

const ShowPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    localAPI.get('/posts/').then((posts) => setPosts(posts.data));
  }, [posts]);

    return posts.map((post) => (
        <ShowPost post={post}></ShowPost>
  ));
};

export default ShowPosts;
