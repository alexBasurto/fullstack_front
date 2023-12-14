import {useState, useEffect} from 'react';
import {getUserDetails} from '../utils/apiLagunpay.js';

function UserDetailsShow({ editMode = false, setEditMode, save = false, setSave  }) {
    const [userDetails, setUserDetails] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserDetails();
                const data = await response.json();
                setUserDetails(data);
            } catch (error) {
                console.error('Error en la peticion de usuario', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {userDetails && (
                <>
                    <button type="button" onClick={() => {
                        setSave(false);
                        setEditMode(true);
                    }
                    }>Editar</button>
                    <p>Nombre: {userDetails.username}</p>
                    <p>Email: {userDetails.email}</p>
                    <p>Número de teléfono: {userDetails.mobile}</p>
                    <p>Rol: {userDetails.role}</p>
                    <p>Activo: {userDetails.active ? 'Sí' : 'No'}</p>
                    <p>Fecha de creación: {userDetails.createdAt.substring(0, 10)}</p>
                    <p>Fecha de actualización: {userDetails.updatedAt.substring(0, 10)}</p>
                </>
            )}
        </>
    );
}

export default UserDetailsShow;