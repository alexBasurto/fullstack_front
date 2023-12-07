//Register.jsx

import React from 'react';

function Register() {
  return (
    <div>
      <h1>Registro</h1>
      <form action="post">
        <label>
          Nombre de usuario:
          <input type="text" name="username" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Móvil:
          <input type="tel" name="mobile" />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" />
        </label>
        <label>
          Confirmar contraseña:
          <input type="password" name="confirmPassword" />  
        </label>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;