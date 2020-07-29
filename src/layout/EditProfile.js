import React, { useState, useEffect } from "react";
import baseurl from "../api/localAPI";
import { useGlobalState } from "../config/GlobalState";
import localAPI from "../api/localAPI";
import { useParams } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";

function EditProfile() {
  const { store, dispatch } = useGlobalState();
  const { userID, posts } = store;
  const [userDetails, setUserDetails] = useState({ bio: "", name: "" });
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
    <div className="container">
      <div className="card ">
        <div className="card-body align-self-center mr-3 ">
          <h5 className="card-title">Edit Profile</h5>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">
                  Your Name
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={userDetails.name}
                onChange={(e) =>
                  setUserDetails({ ...setUserDetails, name: e.target.value })
                }
              ></input>
            </div>
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">
                About Your Self
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={userDetails.bio}
              onChange={(e) =>
                setUserDetails({ ...setUserDetails, bio: e.target.value })
              }
            ></input>
          </div>

          <button className="login-button" onClick={updateProfile}>
            Update
          </button>
          {isUpdated && <Redirect to="/home"></Redirect>}
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
