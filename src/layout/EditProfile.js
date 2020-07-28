import React, { useState, useEffect } from "react";
import baseurl from "../api/localAPI";
import { useGlobalState } from "../config/GlobalState";
import localAPI from "../api/localAPI";
import { useParams } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";

function EditProfile() {
  const { store, dispatch } = useGlobalState();
  const { userID, posts } = store;
  const [userDetails, setUserDetails] = useState({ bio: "", dob: "" });
  const [isUpdated, setIsUpdateed] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        const response = await localAPI.get(`/users/${userID}`);
        setUserDetails(response.data);
      })();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const updateProfile = () => {
    localAPI
      .put(`/users/bio`, {
        bio: userDetails.bio,
        dob: userDetails.dob,
      })
      .then((res) => {
        setIsUpdateed(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Edit Profile</h1>
      <label>About Your Self</label>
      <input
        className=""
        placeholder="About Your Self"
        type="text"
        value={userDetails.bio}
        onChange={(e) =>
          setUserDetails({ ...setUserDetails, bio: e.target.value })
        }
      ></input>

      <br></br>
      <label>Date of birth</label>
      <input
        className=""
        placeholder="Date of birt"
        type="date"
        value={userDetails.dob}
        onChange={(e) =>
          setUserDetails({ ...setUserDetails, dob: e.target.value })
        }
      ></input>
      <button className="login-button" onClick={updateProfile}>
        Update
      </button>
      {isUpdated && <Redirect to="/home"></Redirect>}
    </div>
  );
}

export default EditProfile;
