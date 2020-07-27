import React, { useState, useEffect } from "react";
import baseurl from "./../api/localAPI";
import localAPI from "./../api/localAPI";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [userFriends, setUserFriends] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    try {
      (async () => {
        const response = await localAPI.get(`profile/user/${id}`);
        setProfile(response.data);
        console.log(response.data);

        // // Get Post that belong to user this user
        // const postByUserId = await localAPI.get(`/posts/${id}`);
        // console.log(postByUserId);

        // // get user details
        const res = await localAPI.get(`/users/${id}`);
        setUserDetails(res.data);
        setUserFriends(res.data.friends);

        console.log(res);
      })();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const friends = userFriends.map((friend) => {
    return (
      <div>
        <ul>
          <li>Friend Name: {friend.name}</li>
        </ul>
      </div>
    );
  });

  return profile && userDetails ? (
    <div>
      <h1>this is profile</h1>

      <Link to={`/home/`}>Back to home</Link>
      <br></br>
      <button className="">Add Friend</button>
      <h1>my bio{profile.bio}</h1>
      <h1>my dob {profile.dob}</h1>
      <h1>Join Date: {userDetails.date}</h1>

      {friends}
    </div>
  ) : (
    <div>
      <h1>No profile for this user</h1>
    </div>
  );
}

export default Profile;
