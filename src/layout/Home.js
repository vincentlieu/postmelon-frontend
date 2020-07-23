import React from "react";
import { Container } from '@material-ui/core';
import CreatePost from "../components/posts/CreatePost";
import HomeFeed from '../components/posts/HomeFeed';


const Home = () => {
  return (
    <Container maxWidth="sm" >
      <h1>Home</h1>
      <CreatePost />
      <HomeFeed/>
      {/* {sessionStorage.removeItem("token") */}
    </Container>
  );
};

export default Home;
