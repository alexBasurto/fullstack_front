//UserDetails.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function UserDetails() {
  return (
    <>
    <Header />
    <main>
      <Link to={"/my-groups"} >Volver a mis grupos</Link>
      <h2>Mi perfil</h2>
    </main>
    <Footer />
    </>
  );
}

export default UserDetails;