import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import '../styles/IndexPage.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h2>Home</h2>
            <ul className="nav-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/apply">How to Apply</Link></li>
                <li>
                    <Dropdown />
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
