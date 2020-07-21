import React from "react";
import ViewPosts from "../posts/ViewPosts";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <ViewPosts />
      {sessionStorage.token}
      {/* {sessionStorage.removeItem("token") */}
    </div>
  );
};

export default Home;
