import React from "react";
import ViewPosts from "../posts/ViewPosts";
import CreatePost from "../posts/CreatePost";
import ShowPosts from '../posts/ShowPosts';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <CreatePost />
      <ShowPosts />
      {sessionStorage.token}
      {/* {sessionStorage.removeItem("token") */}
    </div>
  );
};

export default Home;
