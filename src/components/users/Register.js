import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import localAPI from '../../api/localAPI';
import {TextField} from '@material-ui/core';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, SetErrorMessage] = useState('');
  const [isCreated, setIscreated] = useState(false);

  const sendRequestToRegister = () => {
    if (name === '') {
      SetErrorMessage(' Please fill out name');
    } else if (email === '') {
      SetErrorMessage('Email can not be emty');
    } else if (password === '') {
      SetErrorMessage('Password can not be emty');
    } else if (password !== confirmPassword) {
      SetErrorMessage('Password does not matched');
    } else {
      localAPI
        .post(`/users`, {
          name: name,
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.data);

          setName('');
          setEmail('');
          setpassword('');
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
      <TextField
        className='name'
        placeholder='Full Name'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}/>
      <br></br>
      <TextField
        className='register-email'
        placeholder='Email'
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>
      <br></br>
      <TextField

        className='register-password'
        placeholder='Password'
        type='password'
        value={password}
        onChange={(e) => setpassword(e.target.value)}/>{' '}
      <br></br>
      <TextField

        className='confirm-password'
        placeholder='Confirm Password'
        type='password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}/>
      <button className='register-button' onClick={createUser}>
      <b>Register</b>
      </button>
      {isCreated && <Redirect to='/home'></Redirect>}
      {errorMessage && (
        <div className='error-message-register'> {errorMessage} </div>
      )}
      <br></br>
    </div>
  );
}

export default Register;
