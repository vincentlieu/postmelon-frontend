import React from "react";

import { Redirect } from "react-router-dom";
import localAPI from "../api/localAPI";

function NavBar() {
  const signOut = () => {};
  const createProfile = () => {};

  return (
    <div>
      <h1>Nav Bar</h1>
      <button className="" onClick={signOut}>
        Sign Out
      </button>
      <button className="" onClick={createProfile}>
        Create/Update Profile
      </button>
    </div>
  );
}

export default NavBar;
