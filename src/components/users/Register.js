import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import localAPI from '../../api/localAPI';

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
      <h1>register</h1>
      <h1>New user</h1>
      <label>Name</label>
      <input
        className='name'
        placeholder='Name'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}></input>
      <br></br>
      <label>Email</label>
      <input
        className='register-email'
        placeholder='Email'
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}></input>
      <br></br>
      <label>Password</label>
      <input
        className='register-password'
        placeholder='Password'
        type='password'
        value={password}
        onChange={(e) => setpassword(e.target.value)}></input>{' '}
      <br></br>
      <label>Confirm Password</label>
      <input
        className='confirm-password'
        placeholder='Password'
        type='password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}></input>
      <button className='register-button' onClick={createUser}>
        Submit
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
