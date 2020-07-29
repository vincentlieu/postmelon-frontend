import React, { useState } from 'react';
import { useGlobalState } from '../../config/GlobalState';
import localAPI from '../../api/localAPI';
import {TextField, Box, Button} from '@material-ui/core';

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
    <Box className='registration-login-container'>
      <TextField
        fullWidth={true}
        margin='normal'
        className='login-email'
        placeholder='Email'
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        className='login-password'
        fullWidth={true}
        margin='normal'
        placeholder='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        className='login-button'
        onClick={sendRequestToLogIn}
        fullWidth={true}
        variant='contained'
        color='primary'>
        Login
      </Button>
      {errorMessage && <Box className='error-message'> {errorMessage} </Box>}
    </Box>
  );
}

export default Login;
