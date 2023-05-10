import React, {useState} from 'react'
import { NavLink } from "react-router-dom";

import {FiMenu} from 'react-icons/fi';
import {FaTimes} from 'react-icons/fa';
import './Navbar.css'

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    return (
        
        <header className='navbar'>
            <div className="logo">
                <h2>MIT</h2>
                <div className="inner-logo">
                    <span>HEALTH</span>
                    <span>CENTER</span>
                </div>
            </div>

            <div className="toggler">
                <FiMenu 
                    className='open-icon' 
                    onClick={() => setToggle(true)}
                />
            </div>

            

            <nav className={toggle ? 'active' : ''}>
                <div className="toggler-reverse">
                    <FaTimes 
                        className='close-icon' 
                        onClick={() => setToggle(false)}
                    />
                </div>

                <ul>
                    <li>
                        <NavLink to="/" activeclassname="active">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/staffs">Staffs</NavLink>
                    </li>
                    <li className='active'>
                        <NavLink to="/stocks">Stocks</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">Contact</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar