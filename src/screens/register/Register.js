import React, { useState } from 'react';
import '../../common/common.css'
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { loginApiCall, registerApiCall } from '../../util/fetch';

const Register = ({ onRegisterSuccess }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setmobileError] = useState(false);



  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); 


    const validEmail = /\S+@\S+\.\S+/.test(email);
    if (!validEmail) {
      setEmailError(true);
      return;
    }

    const validMobile = /^\d{10}$/.test(mobile); 
    if (!validMobile) {
      setmobileError(true);
      return;
    }

    try {
      await registerApiCall(email, password, firstName, lastName, mobile);
      await loginApiCall(email, password);
      onRegisterSuccess();
    } catch (error) {
      console.error('Register error:', error);
      setErrorMessage('Invalid register request');
    }
  };

  return (
    <form className='login-register-form' onSubmit={handleRegisterSubmit} autoComplete="off">
      <FormControl margin="normal" required >
        <InputLabel htmlFor="firstName">First Name</InputLabel>
        <Input
          id="firstName"
          name="firstName"
          autoFocus
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}

        />
      </FormControl>
      <FormControl margin="normal" required>
        <InputLabel htmlFor="lastName">Last Name</InputLabel>
        <Input
          id="lastName"
          name="lastName"
          autoFocus
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}

        />
      </FormControl>
      <FormControl margin="normal" required error={mobileError} >
        <InputLabel htmlFor="mobile">Mobile</InputLabel>
        <Input
          id="mobile"
          name="mobile"
          autoFocus
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        {mobileError && <span style={{ color: 'red' }}>Invalid mobile number. Please enter 10 digits.</span>}
      </FormControl>
      <FormControl margin="normal" required error={emailError}>
        <InputLabel htmlFor="email">Email Address</InputLabel>
        <Input
          id="email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <span style={{ color: 'red' }}>Enter valid Email</span>}
      </FormControl>
      <FormControl margin="normal" required>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        REGISTER
      </Button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default Register;