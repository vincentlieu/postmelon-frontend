import React, { useEffect, useState }from "react";
import { Container } from '@material-ui/core';
import CreatePost from "../components/posts/CreatePost";
import localAPI from '../api/localAPI';
import ShowPost from '../components/posts/ShowPost';
import { CircularProgress} from '@material-ui/core';
import NavBar from "./NavBar";
import { useGlobalState } from "../../src/config/GlobalState";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { store, dispatch} = useGlobalState();
    const { posts, userID } = store;

  useEffect(() => {
    localAPI
      .get('/posts/')
      .then((posts) => {
        dispatch({ type: 'setPosts', data: posts.data });
        console.log(posts.data);
      })
      .then(setIsLoading(!isLoading));
  }, []);
  
  function renderPosts() {
    return posts.map((post) => <ShowPost post={post}></ShowPost>);
  }

  function renderLoading() {
    return <CircularProgress color='primary' height='100%' />;
  }

  return (
    <Container maxWidth='sm'>
      <h1>Home {userID}</h1>
      <CreatePost />
      <>{!isLoading ? renderPosts() : renderLoading()}</>
      {/* {sessionStorage.removeItem("token") */}
    </Container>
  );
};

export default Home;
