//CreateGroup.jsx

import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';


import Header from '../components/Header';
import Footer from '../components/Footer';
const VITE_BACKEND_HOST =
    import.meta.env.VITE_BACKEND_HOST || "http://localhost:3006";

function CreateGroup() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [group, setGroup] = useState({
    name: '',
    description: '',
    users: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    active: true,
    owner: user ? user : '',
    transactions: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGroup({ ...group, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const usersArray = group.users.split(',').map(user => user.trim());
    usersArray.push(group.owner);
    const groupData = { ...group, users: usersArray };
    try {
      const response = await fetch(`${VITE_BACKEND_HOST}/groups/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupData),
      });
      const data = await response.json();
      console.log('Success:', data);
      navigate('/my-groups');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Header />
      <main>
        <h2>Crear grupo</h2>
        <Link to={"/my-groups"} >Volver a mis grupos</Link>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre del grupo:
            <input type="text" name="name" value={group.name} onChange={handleInputChange} />
          </label>
          <label>
            Descripción:
            <input type="text" name="description" value={group.description} onChange={handleInputChange} />
          </label>
          <label>
            Agregar usuarios:
            <input type="text" name="users" value={group.users} onChange={handleInputChange} />
          </label>
          <input type="submit" value="Crear Grupo" />
        </form>
      </main>
      <Footer />
    </>
  );
}

export default CreateGroup;