import React, { useState, useEffect } from "react";
import baseurl from "../api/localAPI";
import { useGlobalState } from "../config/GlobalState";
import localAPI from "../api/localAPI";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ShowPost from "../components/posts/ShowPost";

function Profile() {
  const { store, dispatch } = useGlobalState();
  const { userID, posts } = store;
  const [userDetails, setUserDetails] = useState([]);
  const [userFriends, setUserFriends] = useState([]);

  let { id } = useParams();
  const userPosts = posts.filter((post) => {
    return post.authorId === id;
  });

  useEffect(() => {
    try {
      (async () => {
        const response = await localAPI.get(`/users/${userID}`);
        setUserDetails(response.data);
        setUserFriends(response.data.friends);

        console.log(response.data);
      })();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return userDetails && userFriends ? (
    <div>
      <h1>this is profile</h1>

      <Link to={`/home/`}>Back to home</Link>
      <br></br>
      <button className="">Add Friend</button>

      <h1>my bio: {userDetails.bio}</h1>
      <h1>my dob: {userDetails.dob}</h1>
      <h1>Join Date: {userDetails.date}</h1>

      <div>
        {userFriends.map((friend) => (
          <ul>
            <li>{friend.name}</li>
          </ul>
        ))}
      </div>

      <div>
        {userPosts.map((post) => {
          return <ShowPost post={post} />;
        })}
      </div>
    </div>
  ) : (
    <div>
      <h1>No profile for this user</h1>
    </div>
  );
}

export default Profile;
