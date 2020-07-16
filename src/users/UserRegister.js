import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [isCreated, setIscreated] = useState(false);
  const [isLogin, setIslogin] = useState(false);
  const [errorMessage, SetErrorMessage] = useState("");

  const sendRequestToRegister = () => {
    if (name && email && password) {
      axios
        .post(
          `https://cors-anywhere.herokuapp.com/https://postmelon.herokuapp.com/api/users`,
          {
            name: name,
            email: email,
            password: password,
          }
        )
        .then((response) => {
          console.log(response);
          setName("");
          setEmail("");
          setpassword("");
          setIscreated(true);
          SetErrorMessage("");
        });
    } else {
      SetErrorMessage("please fill out value");
    }
  };

  const sendRequestToLogIn = () => {
    axios
      .post(
        `https://cors-anywhere.herokuapp.com/https://postmelon.herokuapp.com/api/auth`,
        {
          email: loginEmail,
          password: loginPassword,
        }
      )
      .then(
        (response) => {
          console.log(response);
          setLoginEmail("");
          setloginPassword("");
          setIslogin(true);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const logInUser = () => {
    sendRequestToLogIn();
  };

  const createUser = () => {
    sendRequestToRegister();
  };
  return (
    <div>
      <h1>Login</h1>

      <label>Email</label>
      <input
        className=""
        placeholder="Email"
        type="text"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      ></input>

      <br></br>
      <label>Password</label>
      <input
        className=""
        placeholder="Password"
        type="password"
        value={loginPassword}
        onChange={(e) => setloginPassword(e.target.value)}
      ></input>
      <button onClick={logInUser}>Login</button>
      <h1>New user</h1>
      <label>Name</label>
      <input
        className=""
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <br></br>
      <label>Email</label>
      <input
        className=""
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <br></br>
      <label>Password</label>
      <input
        className=""
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      ></input>
      <button onClick={createUser}>Submit</button>
      {errorMessage}
      {isCreated && <Redirect to="/home"></Redirect>}
      {isLogin && <Redirect to="/home"></Redirect>}
    </div>
  );
};

export default UserRegister;
