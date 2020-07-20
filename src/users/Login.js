import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, SetErrorMessage] = useState("");
  const [isLogin, setIslogin] = useState(false);
  const sendRequestToLogIn = () => {
    if (email === "") {
      SetErrorMessage("Email can not be emty");
    } else if (password === "") {
      SetErrorMessage("Password can not be emty");
    } else {
      axios
        .post(
          `https://cors-anywhere.herokuapp.com/https://postmelon.herokuapp.com/api/auth`,
          {
            email: email,
            password: password,
          }
        )
        .then((res) => {
          console.log(res.data);
          setIslogin(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const logInUser = () => {
    sendRequestToLogIn();
  };

  return (
    <div>
      <h1>login</h1>
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
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      {isLogin && <Redirect to="/home"></Redirect>}
      <button onClick={logInUser}>Login</button>
      {errorMessage}
    </div>
  );
}

export default Login;
