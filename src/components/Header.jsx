import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutApi } from '../utils/apiLagunpay';

function Header() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutApi()
        .then(response => {
            setUser(null);
            navigate('/');
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
                    {user ? 
                    <>
                    <li><Link to="/user-details">User Details</Link></li>
                    <li><Link to="/my-groups">My Groups</Link></li>
                    </>
                    : null}
                    <li>
                    {user ? <a onClick={handleLogout}>Logout</a> : <Link to="/login">Login</Link>}
                    </li>
                </ul>
            </nav>
            {user && <p>Usuario logueado: {user}</p>}
        </header>
    )
}

export default Header;