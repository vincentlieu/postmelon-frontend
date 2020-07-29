import React, { useState } from "react";
import { Link } from 'react-router-dom'
import Register from "../components/users/Register";
import Login from "../components/users/Login";
import MediaControlCard from "./MediaControlCard";
import NewUser from "./NewUser"
import Displayimage from "../assets/postmelon8.jpg"

const Landing = ({ history }) => {
  const [renderRegister, setRenderRegister] = useState(true)
  const [renderLogin, setRenderLogin] = useState(false)

  const handleRegister = () => {
    setRenderRegister(true)
    setRenderLogin(false)
  }

  const handleLogin = () => {
    setRenderRegister(false)
    setRenderLogin(true)
  }

  return (
    <center>
      <div className='login-container'>
        <img src={Displayimage} className='landing-image'/>
        <div className="landing-register-login">  
          <div className="pipes"> 
            <span onClick={handleRegister} className="registerpipe">Register|</span> 
            <span onClick={handleLogin} className="loginpipe">Login</span>
          </div>
            {renderRegister && <Register /> || renderLogin && <Login history={history} />} 
        </div>
      </div>
    </center>

  );
};

export default Landing;
