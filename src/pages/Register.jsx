import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { registerApi } from '../utils/apiLagunpay';
import { useTheme } from '../context/ThemeContext';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

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

    // Validación de número de teléfono
    const phoneRegex = /^\d{9}$/;
    if (!phoneRegex.test(mobile)) {
      errorsAccumulated += 'El número de teléfono no es válido, debe tener 9 dígitos. ';
    }

    // Validación de contraseña y confirmación de contraseña
    if (password !== passwordVerify) {
      errorsAccumulated += 'Las contraseñas no coinciden. ';
    }

    if (errorsAccumulated !== '') {
      setError(errorsAccumulated);
      return false;
    }

    return true;
  };

const handleSubmit = (e) => {
  e.preventDefault();
  if (email === '' || password === '' || username === '' || mobile === '' || passwordVerify === '') {
    setError('Todos los campos son obligatorios');
    return;
  }

  if (!validateInputs()) {
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
    <main className='mt-4'>
      <h2>Registro</h2>
      {!isRegistered && <>
      <p>Introduce tus datos para registrarte</p>
      <Link to="/login">¿Ya tienes cuenta? Inicia sesión.</Link>
      {error && 
      <div>
        <span className="badge rounded-pill text-bg-warning">Atención</span>
        <p className='error'>{error}</p>
      </div>}
      <form action="post" onSubmit={handleSubmit} onReset={() => {
        setUsername('');
        setEmail('');
        setMobile('');
        setPassword('');
        setPasswordVerify('');
        }}>
          <div className="mb-3">
            <label className='form-label' htmlFor='username'>
              Nombre de usuario:
              <input id='username' className='form-control' type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
          </div>

          <div className="mb-3">
            <label className='form-label' htmlFor='email'>
              Email:
              <input id='email' className='form-control' type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
          </div>

          <div className="mb-3">
            <label className='form-label' htmlFor='mobile'>
              Móvil:
              <input id='mobile' className='form-control' type="tel" name="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </label>
          </div>

          <div className="mb-3">
            <label className='form-label' htmlFor='password'>
              Contraseña:
              <input id='password' className='form-control' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
          </div>

          <div className="mb-3">
            <label className='form-label' htmlFor='passwordVerify'>
              Confirmar contraseña:
              <input id='passwordVerify' className='form-control' type="password" name="passwordVerify" value={passwordVerify} onChange={(e) => setPasswordVerify(e.target.value)} />
            </label>
          </div>

          <div className="mb-3">
            <button type="submit" className={"btn btn-" + theme}>Registrarse</button>
          </div>

          <div className="mb-3">
            <button type="reset" value="Limpiar" className={"btn btn-" + theme}>Limpiar</button>
          </div>
      </form>
      </>
      }
      {isRegistered && !error && <>
      <p className='success'>Usuario registrado correctamente</p>
      <Link to="/login">Inicie sesión.</Link>
      </>}
    </main>
    <Footer />
    </>
  );
}

export default Register;