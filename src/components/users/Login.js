import React, { useState } from 'react';
import { useGlobalState } from '../../config/GlobalState';
import localAPI from '../../api/localAPI';

function Login({ history }) {
  const { dispatch } = useGlobalState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, SetErrorMessage] = useState('');

  const sendRequestToLogIn = () => {
    if (email === '') {
      SetErrorMessage('Email can not be emty');
    } else if (password === '') {
      SetErrorMessage('Password can not be emty');
    } else {
      localAPI
        .post(`/auth`, {
          email: email,
          password: password,
        })
        .then((res) => {
          sessionStorage.setItem('token', res.data.token);
          dispatch({ type: 'setToken', data: res.data.token });
          dispatch({ type: 'getUserID', data: res.data.userId });
          history.push('/home');
        })
        .catch((err) => {
          SetErrorMessage(' Server Error Please try again');
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h1>login</h1>
      <label>Email</label>
      <input
        className='login-email'
        placeholder='Email'
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}></input>

      <br></br>
      <label>Password</label>
      <input
        className='login-password'
        placeholder='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}></input>
      <button className='login-button' onClick={sendRequestToLogIn}>
        Login
      </button>
      {errorMessage && <div className='error-message'> {errorMessage} </div>}
    </div>
  );
}

export default Login;
