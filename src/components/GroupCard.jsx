//GroupCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function GroupCard({ group }) {
  return (
    <Link to={`/group/${group._id.$oid}`} className="group-card">
      <h2>{group.name}</h2>
      <p>{group.description}</p>
    </Link>
  );
}

export default GroupCard;