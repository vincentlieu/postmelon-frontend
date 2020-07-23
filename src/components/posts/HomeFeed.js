import React, { useEffect, useState } from 'react';
import localAPI from '../../api/localAPI';
import ShowPost from '../posts/ShowPost';
import { CircularProgress, Box } from '@material-ui/core';

const ShowPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localAPI
      .get('/posts/')
      .then((posts) => setPosts(posts.data), [posts])
      .then(() => setIsLoading(false), [isLoading]);
  });

  function renderPosts() {
    return posts.map((post) => <ShowPost post={post}></ShowPost>);
  }

  function renderLoading() {
      return (
          <CircularProgress color='primary' height='100%'/>
      );
  }

    return (
        <>
            {!isLoading ? renderPosts() : renderLoading()}
        </>
    )
};

export default ShowPosts;
