import React, { useState, useEffect } from "react";
import baseurl from "../api/localAPI";
import { useGlobalState } from "../config/GlobalState";
import localAPI from "../api/localAPI";
import { useParams } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
import ShowPost from "../components/posts/ShowPost";
import Moment from "react-moment";

function Profile() {
  const { store, dispatch } = useGlobalState();
  const { userID, posts } = store;
  const [userDetails, setUserDetails] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [isDelete, setIsdelete] = useState(false);

  let { id } = useParams();
  const userPosts = posts.filter((post) => {
    return post.authorId === id;
  });

  useEffect(() => {
    try {
      (async () => {
        const response = await localAPI.get(`/users/${id}`);
        setUserDetails(response.data);
        setUserFriends(response.data.friends);

        console.log(response.data);
      })();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const removeUser = () => {
    try {
      (async () => {
        const response = await localAPI.delete(`/users/`);
        setIsdelete(true);
        console.log(response.data);
      })();
    } catch (e) {
      console.log(e);
    }
  };

  return userDetails && userFriends ? (
    <div className="container">
      <div className="card">
        <div className="row">
          <div className="col">
            <img
              className=" display-img img-thumbnail rounded mx-auto d-block"
              src={userDetails.avatar}
              alt="profile image "
            ></img>
          </div>
          <div className="col">
            <div className="card-body">
              <h3 className="card-title">{userDetails.name}</h3>
              <p className="card-text">About Me: {userDetails.bio}</p>
              <p className="card-text">
                <span className="font-weight-bold">Join Dated:</span>&nbsp;
                <Moment format="YYYY/MM/DD">{userDetails.date}</Moment>
              </p>

              <div className="row">
                <div className="col">
                  <p>Posts:{userPosts.length}</p>
                </div>

                <div className="col">
                  <p>Likes</p>
                </div>
                <div className="col">
                  <div className="dropdown">
                    <button
                      className=" btn btn-secondary background-color dropdown-toggle btn "
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <p className="text-white">Friends:{userFriends.length}</p>
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a className="dropdown-item" href="#">
                        <div>
                          {userFriends.map((friend) => (
                            <div>{friend.name}</div>
                          ))}
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col align-self-center mr-3 ">
            <button
              type="button"
              className=" btn btn-secondary background-color text-white"
            >
              add friend
            </button>
          </div>
          <div className="col align-self-center mr-3 ">
            <button
              onClick={removeUser}
              type="button"
              className="btn btn-secondary background-color text-white"
            >
              {" "}
              <i class="fa fa-trash-o"></i> Account
            </button>
          </div>
        </div>
      </div>

      <div>
        {userPosts.map((post) => {
          return <ShowPost post={post} />;
        })}
      </div>
      {isDelete && <Redirect to="/"></Redirect>}
    </div>
  ) : (
    <div>
      <h1>No profile for this user</h1>
    </div>
  );
}

export default Profile;
