import React from 'react';

import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <h1>LagunPay</h1>
            <nav>
                <ul>
                    <li><Link to="/">Hogar</Link></li>
                    <li><Link to="/user-details">User Details</Link></li>
                    <li><Link to="/my-groups">My Groups</Link></li>
                    <li><Link to="/create-group">Create Group</Link></li>
                    <li><Link to="/create-transaction">Create Transaction</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;