import React, { useState } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Login from '../../screens/login/Login';
import logo from '../../assets/logo.jpeg';
import Register from '../../screens/register/Register';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { logoutApiCall } from '../../util/fetch';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };


    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleLogout = async () => {
        await logoutApiCall();
        navigate('/');
    };

    const handleLoginSuccess = () => {
        setIsModalOpen(false);
        navigate('/');
    };
    const handleRegisterSuccess = () => {
        setIsModalOpen(false);
        navigate('/');
    };

    const handleAuthModalClose = () => {
        setIsModalOpen(false);
        navigate('/');
    }

    return (
        <>
            <div className="header">
                <div className="title" style={{ display: "flex", alignItems: "flex-start" }}>
                    <img className="logo" src={logo} />
                    <h2 className="doctor-finder">Doctor Finder</h2>
                </div>
                {localStorage.getItem('isLoggedIn') ? (
                    <Button variant="contained" color="secondary" style={{ marginRight: 10 }} onClick={handleLogout}>
                        Logout
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" style={{ marginRight: 10 }} onClick={handleOpenModal}>
                        Login
                    </Button>
                )}
            </div>
            <Modal isOpen={isModalOpen} contentLabel="Login/Register" onRequestClose={handleAuthModalClose} >
                <div className='login-register-modal'>
                    <Card>
                        <Typography className='authentication-header' variant="h4" component="h2"  >
                            Authentication
                        </Typography>
                        <CardContent>
                            <Tabs value={activeTab} onChange={handleChangeTab}>
                                <Tab label="LOGIN" />
                                <Tab label="REGISTER" />
                            </Tabs>
                            {activeTab === 0 && (
                                <Login onLoginSuccess={handleLoginSuccess} />
                            )}
                            {activeTab === 1 && (
                                <Register onRegisterSuccess={handleRegisterSuccess} />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </Modal>
        </>
    );
};

export default Header;