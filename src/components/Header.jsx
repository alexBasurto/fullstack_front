import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutApi } from '../utils/apiLagunpay';

function Header() {
    const { user, setUser } = useAuth();

    const handleLogout = () => {
        logoutApi()
        .then(response => {
            console.log(response);
            setUser(null);
        }).catch(error => {
            console.log(error);
        });
    }

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
                    <li>
                    {user ? <button onClick={handleLogout}>Logout</button> : <Link to="/login">Login</Link>}
                    </li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>
            {user && <p>Usuario logueado: {user}</p>}
        </header>
    )
}

export default Header;