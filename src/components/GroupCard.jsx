//GroupCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const getMyGroups = async (id) => {
  try{
    const response = await fetch(`${VITE_BACKEND_HOST}/my-groups`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id}),
    });
    if (response.ok) {
      return response;
    } else {
      throw new Error('Error al obtener grupos');
    }
    } catch (error) {
      console.error("Error en la peticion de grupos", error.message);
      throw error;
    }
  }


function GroupCard({ group }) {
  return (
    <Link to={`/group/${group._id}`} className="group-card">
      <h2>{group.name}</h2>
      <p>{group.description}</p>
    </Link>
  );
}

export default GroupCard;