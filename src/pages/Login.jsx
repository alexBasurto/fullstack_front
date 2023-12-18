//Login.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {loginApi, sessionApi} from '../utils/apiLagunpay';
import { useSession } from '../context/SessionContext';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Login() {
    const { session, setSession } = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const validateInputs = () => {
        // Validación de email
        let errorsAccumulated = '';
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
        errorsAccumulated += 'El formato del email no es válido. ';
        }

        // Validación de contraseña
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
        if (!passwordRegex.test(password)) {
        errorsAccumulated += 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número. ';
        }

        if (errorsAccumulated !== '') {
        setError(errorsAccumulated);
        return false;
        }

        return true;
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setError('Todos los campos son obligatorios');
            return;
        }
        if (!validateInputs()) {
            return;
        }
        setError(null);
        loginApi(email, password)
        .then(response => {
            setSession(response.data);
        }).catch(error => {
            setError('Usuario o contraseña incorrectos');
        });            
    }

    return (
        <>
        <Header />
        <main>
            <h2>Login</h2>
            {session && !error && <p className='success'>Usuario logueado correctamente</p>}
            {!session &&
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

                <button type="submit" className="btn btn-outline-info">Iniciar sesión</button>
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