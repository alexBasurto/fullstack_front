//Group.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getGroupDetails, deleteGroup, getUserByEmail } from '../utils/apiLagunpay';
import GroupBalance from '../components/GroupBalance';

function Group() {
  const { id } = useParams();
  const [group, setGroup] = useState([]);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (group && group.users) {
      Promise.all(group.users.map(user => getUserByEmail(user)))
        .then(setUsers)
        .catch(console.error);
    }
  }, [group]);

  const handleGetGroup = async () => {
    try {
      const response = await getGroupDetails(id);
      const data = await response.json();
      const users = data.users;
      console.log("USUARIO encontrado", await getUserByEmail(users[0]));
      setGroup(data);
    } catch (error) {
      console.error("Error en la peticion de grupos", error.message);
    }
  }

  useEffect(() => {
    handleGetGroup();
  }
  , []);

  const handleDeleteGroup = async () => {
    try {
      const response = await deleteGroup(id);
      const data = await response.json();
      console.log("Grupo eliminado", data);
      navigate('/my-groups');
    } catch (error) {
      console.error("Error al eliminar grupo", error.message);
    }
  }


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
        <br/>
        <Link to={`/group/${id}/create-transaction`}>Añadir transacción</Link>
        <button onClick={handleDeleteGroup}>Eliminar grupo</button>
        <p>{group.description}</p>
        <h3>Usuarios</h3>
        {users && (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.username}</li>
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