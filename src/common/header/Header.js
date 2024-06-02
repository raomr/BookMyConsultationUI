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
import axios from 'axios';
const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleLogout =  () => {
        try {
            const response =  axios.post("http://localhost:8080/auth/logout", {}, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('token');
            console.log('Logout success:', localStorage.getItem('token'));
        } catch (error) {
            console.error('Logout:', error);
        }
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

    return (
        <>
            <div className="header">
                <img className="logo" src={logo} />
                <div className="title">Doctor Finder</div>
                {localStorage.getItem('isLoggedIn') ? (
                    <Button variant="contained" color="secondary" onClick={handleLogout}>
                        Logout
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleOpenModal}>
                        Login
                    </Button>
                )}
            </div>
            <Modal isOpen={isModalOpen} contentLabel="Login/Register">
                <Card>
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
            </Modal>
        </>
    );
};

export default Header;