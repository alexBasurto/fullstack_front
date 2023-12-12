//Login.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {loginApi} from '../utils/apiLagunpay';
import { useAuth } from '../context/AuthContext';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Login() {
    const { user, setUser } = useAuth();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = useState(null);

    const handleSumbit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setError('Todos los campos son obligatorios');
            return;
        }
        setError(null);
        loginApi(email, password)
        .then(response => {
            console.log(response);
            setUser(email);
        }).catch(error => {
            console.log(error);
            setError('Error al iniciar sesión');
        });            
    }

    return (
        <>
        <Header />
        <main>
            <h2>Login</h2>
            {user && !error && <p className='success'>Usuario logueado correctamente</p>}
            {!user &&
            <>
            <p>Introduce tus datos para iniciar sesión</p>
            <Link to="/register">¿No tienes cuenta? Regístrate.</Link>

            {error && <p className='error'>{error}</p>}
            <form action="post" onSubmit={handleSumbit} onReset={() => {
                setEmail('');
                setPassword('');
                }
            }>
                <label>
                Email de usuario:
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>

                <label>
                Contraseña:
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>

                <button type="submit">Iniciar sesión</button>
                <button type="reset" value="Limpiar">Limpiar</button>
            </form>
            </>
            }
        </main>
        <Footer />
        </>


    );
    }

export default Login;