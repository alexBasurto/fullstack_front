//Group.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getGroupDetails } from '../utils/apiLagunpay';
import GroupBalance from '../components/GroupBalance';


function Group() {
  const { id } = useParams();
  const [group, setGroup] = useState([]);

  const handleGetGroup = async () => {
    try {
      const response = await getGroupDetails(id);
      const data = await response.json();
      setGroup(data);
    } catch (error) {
      console.error("Error en la peticion de grupos", error.message);
    }
  }

  useEffect(() => {
    handleGetGroup();
  }
  , []);


  return (
    <>
      <Header />
      <main>
        {!group && <p>Grupo no encontrado</p>}
        {group && (<>
        <h2>{group.name}</h2>
        <Link to={"/my-groups"} >Volver a mis grupos</Link>
        <br/>
        <Link to={`/group/${id}/edit`} >Editar grupo</Link>
        <p>{group.description}</p>
        <h3>Usuarios</h3>
        {group && group.users && (
        <ul>
          {group.users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      )}
        </>
        )}
        {group && group.transactions && (
          <GroupBalance group={group} />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Group;