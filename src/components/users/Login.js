<<<<<<< HEAD
import React, { useState } from 'react';
import { useGlobalState } from '../../config/GlobalState';
import localAPI from '../../api/localAPI';
import {TextField} from '@material-ui/core';
=======
import React, { useState } from "react";
import { useGlobalState } from "../../config/GlobalState";
import localAPI from "../../api/localAPI";
>>>>>>> 4ef7d84945ec563933e41d06936263c322b54071

function Login({ history }) {
  const { dispatch } = useGlobalState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, SetErrorMessage] = useState("");

  const sendRequestToLogIn = () => {
    if (email === "") {
      SetErrorMessage("Email can not be emty");
    } else if (password === "") {
      SetErrorMessage("Password can not be emty");
    } else {
      localAPI
        .post(`/auth`, {
          email: email,
          password: password,
        })
        .then((res) => {
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("userId", res.data.userId);

          dispatch({ type: "setToken", data: res.data.token });
          dispatch({ type: "getUserID", data: res.data.userId });
          history.push("/home");
        })
        .catch((err) => {
          SetErrorMessage(" Server Error Please try again");
          console.log(err);
        });
    }
  };

  return (
    <div>
      <TextField
        className="login-email"
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>
  

      <br></br>
      <TextField
        className="login-password"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
        <br></br><br></br>
      <button className='login-button' onClick={sendRequestToLogIn}>
        Login
      </button>
      {errorMessage && <div className="error-message"> {errorMessage} </div>}
    </div>
  );
}

export default Login;
