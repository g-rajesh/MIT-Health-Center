import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar'
import Home from './components/Home'
import Stocks from './components/Stocks'
import Login from './components/Login';
import Add from './components/Add';
import Update from './components/Update';

const App = () => {
    const [data, setData] = useState([]);
    return (
        <>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/stocks" element={<Stocks data={data} setData={setData} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/add" element={<Add />} />
                <Route path="/update" element={<Update data={data} setData={setData} />} />
            </Routes>
        </>
    )
}

export default App