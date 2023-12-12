//UserDetails.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {getUserDetails} from '../utils/apiLagunpay.js';

function UserDetails() {
    const [userDetails, setUserDetails] = React.useState(null);

    React.useEffect(() => {
        getUserDetails()
        .then(response => {
            console.log(response);
            setUserDetails(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <>
        <Header />
        <main>
            <h2>User Details</h2>
            {userDetails && (
                <>
                <p>Nombre: {userDetails.username}</p>
                <p>Email: {userDetails.email}</p>
                </>
            )}
            <Link to="/">Volver al inicio</Link>
        </main>
        <Footer />
        </>
    )
}

export default UserDetails;