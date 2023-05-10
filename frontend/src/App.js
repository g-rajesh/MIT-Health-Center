import React from 'react'
import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar'
import Home from './components/Home'
import Stocks from './components/Stocks'
import Login from './components/Login';

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/stocks" element={<Stocks />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <Stocks />
        </>
    )
}

export default App