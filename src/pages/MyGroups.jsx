//MyGroups.jsx

import {useState, useEffect} from 'react';
import GroupCard from '../components/GroupCard';
import { Link } from 'react-router-dom';
/* import groups from '../../datos/groups'; */
import Header from '../components/Header';
import Footer from '../components/Footer';
import {getMyGroups} from '../utils/apiLagunpay';



function MyGroups() {

const [groups, setGroups] = useState([]);


const handleGetMyGroups = async () => {
  try {
    const response = await getMyGroups();
    const data = await response.json();
    setGroups(data);
  } catch (error) {
    console.error("Error en la peticion de grupos", error.message);
  }
}

useEffect(() => {
  handleGetMyGroups();
}
, []);


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