import React, { useEffect } from "react";
import localAPI from "../api/localAPI";

function ViewPosts() {
  useEffect(() => {
    localAPI
      .get(`/posts`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>view posts</h1>
    </div>
  );
}

export default ViewPosts;
