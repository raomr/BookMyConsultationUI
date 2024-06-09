import React, { useState } from 'react';
import '../../common/common.css'
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { loginApiCall } from '../../util/fetch';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage(''); 

        if (!email || !password) {
            setErrorMessage('Please fill out all required fields');
            return;
        }

        const validEmail = /\S+@\S+\.\S+/.test(email);
        if (!validEmail) {
            setEmailError(true);
            return;
        }

        try {
            await loginApiCall(email, password);
            onLoginSuccess();
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Invalid email or password');
        }
    };

    return (
        <form className='login-register-form' onSubmit={handleSubmit} autoComplete="off" >
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
                LOGIN
            </Button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
    );
};

export default Login;