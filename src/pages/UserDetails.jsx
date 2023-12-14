import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserDetailsShow from '../components/UserDetailsShow';
import UserDetailsEdit from '../components/UserDetailsEdit';

function UserDetails() {
    const [editMode, setEditMode] = useState(false);

    return (
        <>
        <Header />
        <main>
            <h2>User Details</h2>
            {!editMode && <UserDetailsShow editMode={editMode} setEditMode={setEditMode} />}
            {editMode && <UserDetailsEdit editMode={editMode} setEditMode={setEditMode} />}
        </main>
        <Footer />
        </>
    )
}

export default UserDetails;