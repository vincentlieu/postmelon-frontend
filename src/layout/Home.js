import React, { useEffect, useState }from "react";
import { Container } from '@material-ui/core';
import CreatePost from "../components/posts/CreatePost";
import localAPI from '../api/localAPI';
import ShowPost from '../components/posts/ShowPost';
import { CircularProgress } from '@material-ui/core';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      localAPI
        .get('/posts/')
        .then((posts) => setPosts(posts.data))
        .then(() => setIsLoading(false), [isLoading]);
    }, []);
  
  function renderPosts() {
    return posts.map((post) => <ShowPost post={post}></ShowPost>);
  }

  function renderLoading() {
    return <CircularProgress color='primary' height='100%' />;
  }

  return (
    <Container maxWidth='sm'>
      <h1>Home</h1>
      <CreatePost/>
      <>{!isLoading ? renderPosts() : renderLoading()}</>
      {/* {sessionStorage.removeItem("token") */}
    </Container>
  );
};

export default Home;
