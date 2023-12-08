//CreateGroup.jsx

import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

function CreateGroup() {
  return (
    <>
      <Header />
    <main>
      <h2>Crear grupo</h2>
      <Link to={"/my-groups"} >Volver a mis grupos</Link>
      <form>
        <label>
          Nombre del grupo:
          <input type="text" name="groupName" />
        </label>
        <label>
          Descripción:
          <input type="text" name="description" />
        </label>
        <label>
          Agregar usuarios:
            <input type="text" name="users" />
        </label>
        <input type="submit" value="Crear Grupo" />
      </form>
    </main>
    <Footer />
    </>
  );
}

export default CreateGroup;