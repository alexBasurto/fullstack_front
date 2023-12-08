//UserDetails.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function UserDetails() {
  return (
    <div>
      <Link to={"/my-groups"} >Volver a mis grupos</Link>
      <h1>Mi perfil</h1>
    </div>
  );
}

export default UserDetails;