import React, { useState } from "react";
import { useGlobalState } from "../../config/GlobalState";
import { Redirect } from "react-router-dom";
import localAPI from "../../api/localAPI";
import { TextField, Box, Button } from "@material-ui/core";

function Register() {
  const { dispatch } = useGlobalState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, SetErrorMessage] = useState("");
  const [isCreated, setIscreated] = useState(false);

  const sendRequestToRegister = () => {
    if (name === "") {
      SetErrorMessage(" Please fill out name");
    } else if (email === "") {
      SetErrorMessage("Email can not be emty");
    } else if (password === "") {
      SetErrorMessage("Password can not be empty");
    } else if (password !== confirmPassword) {
      SetErrorMessage("Password does not matched");
    } else {
      localAPI
        .post(`/users`, {
          name: name,
          email: email,
          password: password,
        })
        .then((res) => {
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("userId", res.data.userId);

          dispatch({ type: "setToken", data: res.data.token });
          dispatch({ type: "getUserID", data: res.data.userId });

          setName("");
          setEmail("");
          setpassword("");
          setIscreated(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const createUser = () => {
    sendRequestToRegister();
  };

  return (
    <Box className="registration-login-container">
      <TextField
        fullWidth={true}
        className="name"
        margin="normal"
        placeholder="Full name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        fullWidth={true}
        className="register-email"
        margin="normal"
        placeholder="Email address"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth={true}
        className="password"
        margin="normal"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />{" "}
      <TextField
        fullWidth={true}
        className="confirm-password"
        margin="normal"
        placeholder="Password confirmation"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        className="register-button"
        onClick={createUser}
        fullWidth={true}
        color="primary"
        variant="contained"
      >
        <b>Register</b>
      </Button>
      {isCreated && <Redirect to="/home"></Redirect>}
      {errorMessage && (
        <Box className="error-message-register"> {errorMessage} </Box>
      )}
    </Box>
  );
}

export default Register;
