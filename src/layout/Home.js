import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import CreatePost from "../components/posts/CreatePost";
import ShowPosts from "../components/posts/ShowPosts";
import NavBar from "./NavBar";
import localAPI from "../../src/api/localAPI";
import { useGlobalState } from "../../src/config/GlobalState";

const Home = () => {
  const { store, dispatch } = useGlobalState();
  const { posts, userID } = store;

  useEffect(() => {
    localAPI.get("/posts/").then((posts) => {
      dispatch({ type: "setPosts", data: posts.data });
      console.log(posts.data);
    });
  }, []);
  return (
    <Container maxWidth="sm">
      <h1>Home {userID}</h1>

      {/* <NavBar /> */}

      <CreatePost />
      <ShowPosts posts={posts} />
      {/* {sessionStorage.removeItem("token") */}
    </Container>
  );
};

export default Home;
