import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, SetErrorMessage] = useState("");
  const [isCreated, setIscreated] = useState(false);

  const sendRequestToRegister = () => {
    const letters = /^[A-Za-z]+$/;
    if (name === "") {
      SetErrorMessage(" Please fill out name");
    } else if (!name.match(letters)) {
      SetErrorMessage("Name can only be letter");
    } else if (email === "") {
      SetErrorMessage("Email can not be emty");
    } else if (password === "") {
      SetErrorMessage("Password can not be emty");
    } else if (password !== confirmPassword) {
      SetErrorMessage("Password does not matched");
    } else {
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
          console.log(response.data);

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
    <div>
      <h1>register</h1>
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
      ></input>{" "}
      <br></br>
      <label>Confirm Password</label>
      <input
        className=""
        placeholder="Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      ></input>
      <button onClick={createUser}>Submit</button>
      {isCreated && <Redirect to="/home"></Redirect>}
      {errorMessage}
      <br></br>
    </div>
  );
}

export default Register;
