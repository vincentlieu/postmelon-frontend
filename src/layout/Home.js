import React from "react";
import { Container } from '@material-ui/core';
import CreatePost from "../components/posts/CreatePost";
import ShowPosts from '../components/posts/ShowPosts';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container maxWidth="sm">
      <h1>Home</h1>
      <Link to="">
        <button>Profile</button>
      </Link>
      <CreatePost />
      <ShowPosts/>
      {/* {sessionStorage.removeItem("token") */}
    </Container>
  );
};

export default Home;
