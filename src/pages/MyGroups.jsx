//MyGroups.jsx

import React from 'react';
import GroupCard from '../components/GroupCard';
import { Link } from 'react-router-dom';
import groups from '../../datos/groups';
import Header from '../components/Header';
import Footer from '../components/Footer';




function MyGroups() {
  return (
    <>
    <Header />
    <main>
      <h2>Vista mis grupos</h2>
      <Link to={"/create-group"} >Crear nuevo grupo</Link>
      {groups.map((group, index) => (
        <GroupCard key={index} group={group} />
      ))}
    </main>
    <Footer />
    </>
  );
}

export default MyGroups;