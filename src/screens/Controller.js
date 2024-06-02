import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../common/header/Header";
import Home from "../screens/home/Home";

const Controller = () => {
    //const baseUrl = "/api/v1/";
    return (
        <BrowserRouter>
            <div className="main-container">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Controller;