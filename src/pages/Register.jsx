//Register.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { registerApi } from '../utils/apiLagunpay';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(null);

const handleSubmit = (e) => {
  e.preventDefault();
  if (email === '' || password === '' || username === '' || mobile === '' || passwordVerify === '') {
    setError('Todos los campos son obligatorios');
    return;
  }
  if (password !== passwordVerify) {
    setError('Las contraseñas no coinciden');
    return;
  }
  setError(null);
  registerApi(username, email, mobile, password, passwordVerify).then(response => {
    console.log(response);
    setIsRegistered(true);
  }
  ).catch(error => {
    console.log(error);
    setError('Error al registrar usuario');
  });
}


  return (
    <>
    <Header />
    <main>
      <h2>Registro</h2>
      <Link to="/login">¿Ya tienes cuenta? Inicia sesión.</Link>
      {error && <p className='error'>{error}</p>}
      {isRegistered && !error && <p className='success'>Usuario registrado correctamente</p>}
      <form action="post" onSubmit={handleSubmit} onReset={() => {
        setUsername('');
        setEmail('');
        setMobile('');
        setPassword('');
        setPasswordVerify('');
        }}>
        <label>
          Nombre de usuario:
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Móvil:
          <input type="tel" name="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Confirmar contraseña:
          <input type="password" name="passwordVerify" value={passwordVerify} onChange={(e) => setPasswordVerify(e.target.value)} />
        </label>
        <button type="submit">Registrarse</button>
        <button type="reset" value="Limpiar">Limpiar</button>
      </form>
    </main>
    <Footer />
    </>
  );
}

export default Register;