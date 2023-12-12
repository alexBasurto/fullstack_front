//UserDetails.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {getUserDetails} from '../utils/apiLagunpay.js';

function UserDetails() {
    const [userDetails, setUserDetails] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserDetails();
                const data = await response.json();
                setUserDetails(data);
            } catch (error) {
                console.error('Error en la peticion de usuario', error.message);
            }
        };

        fetchData();
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
                <p>Número de teléfono: {userDetails.mobile}</p>
                <p>Rol: {userDetails.role}</p>
                <p>Activo: {userDetails.active ? 'Sí' : 'No'}</p>
                <p>Fecha de creación: {userDetails.createdAt.substring(0, 10)}</p>
                <p>Fecha de actualización: {userDetails.updatedAt.substring(0, 10)}</p>
                </>
            )}
            <Link to="/">Volver al inicio</Link>
        </main>
        <Footer />
        </>
    )
}

export default UserDetails;