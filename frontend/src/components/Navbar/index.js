import React, {useState, useEffect} from 'react'
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import {FiMenu} from 'react-icons/fi';
import {FaTimes} from 'react-icons/fa';
import './Navbar.css'

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem("username"));

    const navigate = useNavigate();

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
    }, [navigate])

    const logoutHandler = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");

        navigate("/login");
    }

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

                    {
                        username==="admin" && (
                            <li>
                                <NavLink to="/add">Add</NavLink>
                            </li>
                        )
                    }
                    
                    {
                        username==="pharmacist" && (
                            <li>
                                <NavLink to="/update">Update</NavLink>
                            </li>
                        )
                    }

                    {
                        username ? (
                            <li>
                                <button onClick={logoutHandler}>Logout</button>
                            </li>
                        ) : (
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                        )
                    }
                    
                </ul>
            </nav>
        </header>
    )
}

export default Navbar