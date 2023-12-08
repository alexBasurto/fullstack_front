//Group.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import groups from '../../datos/groups';

function Group() {
  const { id } = useParams();
  const group = groups.find(group => group._id.$oid === id);

  if (!group) {
    return <p>Grupo no encontrado</p>;
  }

  return (
    <div>
        <Link to={"/my-groups"} >Volver a mis grupos</Link>
      <h1>{group.name}</h1>
      <p>{group.description}</p>
    </div>
  );
}

export default Group;

