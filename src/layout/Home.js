import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import CreatePost from "../components/posts/CreatePost";
import ShowPost from "../components/posts/ShowPost";
import { CircularProgress } from "@material-ui/core";
import { useGlobalState } from "../../src/config/GlobalState";
import localAPI from "../api/localAPI";

const Home = () => {
  const { store, dispatch } = useGlobalState();
  const { userID, posts } = store;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (posts.length > 0) {
      setIsLoading(false);
    }
  }, []);

  // useEffect(() => {
  //   localAPI
  //     .get("/posts/")
  //     .then((posts) => {
  //       dispatch({
  //         type: "setPosts",
  //         data: posts.data,
  //       });
  //     })
  //     .then(setIsLoading(!isLoading));
  // }, []);

  function renderPosts() {
    return posts
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((post) => <ShowPost post={post} userID={userID}></ShowPost>);
  }

  function renderLoading() {
    return <CircularProgress color="primary" height="100%" />;
  }

  return (
    <Container maxWidth="sm">
      <h1>Home</h1>
      <CreatePost />
      <>{!isLoading ? renderPosts() : renderLoading()}</>
    </Container>
  );
};

export default Home;
