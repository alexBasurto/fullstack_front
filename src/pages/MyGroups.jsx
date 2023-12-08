//MyGroups.jsx

import React from 'react';
import GroupCard from '../components/GroupCard';
import { Link } from 'react-router-dom';
import groups from '../../datos/groups';




function MyGroups() {
  return (
    <div>
      <h1>Vista mis grupos</h1>
      <Link to={"/create-group"} >Crear nuevo grupo</Link>
      {groups.map((group, index) => (
        <GroupCard key={index} group={group} />
      ))}
    </div>
  );
}

export default MyGroups;