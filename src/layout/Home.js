import React from "react";
import { Container } from "@material-ui/core";
import CreatePost from "../components/posts/CreatePost";
import ShowPost from "../components/posts/ShowPost";
import { CircularProgress } from "@material-ui/core";
import NavBar from "./NavBar";
import { useGlobalState } from "../../src/config/GlobalState";

const Home = ({ posts, isLoading }) => {
  const { store, dispatch } = useGlobalState();
  const { userID } = store;

  function renderPosts() {
    return posts
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((post) => (
        <ShowPost data-cy="post" post={post} userID={userID}></ShowPost>
      ));
  }

  function renderLoading() {
    return <CircularProgress color="primary" height="100%" />;
  }

  return (
<<<<<<< HEAD
    <Container maxWidth="sm">
      <h1>Home</h1>
=======
    <Container maxWidth='sm'>
      <h1>Home {userID}</h1>
>>>>>>> a16f8e896e091ec3326cf994cba703cd57f25a19
      <CreatePost />
      <>{!isLoading ? renderPosts() : renderLoading()}</>
      {/* {sessionStorage.removeItem("token") */}
    </Container>
  );
};

export default Home;
