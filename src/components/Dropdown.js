import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/IndexPage.css';

const Dropdown = () => {
    return (
        <div className="dropdown">
            <button className="dropbtn">Account</button>
            <div className="dropdown-content">
                <Link to="/login">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    );
};

export default Dropdown;
