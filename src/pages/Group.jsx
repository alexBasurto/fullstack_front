//Group.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import groups from '../../datos/groups';
import Header from '../components/Header';
import Footer from '../components/Footer';


function Group() {
  const { id } = useParams();
  const group = groups.find(group => group._id.$oid === id);

  return (
    <>
      <Header />
      <main>
        {!group && <p>Grupo no encontrado</p>}
        {group && (<>
        <h2>{groups.name}</h2>
        <Link to={"/my-groups"} >Volver a mis grupos</Link>
        <p>{groups.description}</p>
        <p>{groups.users}</p>
        </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Group;