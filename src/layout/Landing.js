import React from "react";
import Register from "../components/users/Register";
import Login from "../components/users/Login";

const Landing = ({ history }) => {
  return (
    <div>
      <h1>Landing Page</h1>
      <Login history={history}/>
      <Register />
    </div>
  );
};

export default Landing;
