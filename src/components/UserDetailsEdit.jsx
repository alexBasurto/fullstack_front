import {useState, useEffect} from 'react';
import { getUserDetails } from '../utils/apiLagunpay';

function UserDetailsEdit({ editMode = true, setEditMode }) {
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
                        setEditMode(false)
                    }}>Guardar</button>
                    <form>
                        <label htmlFor="username">Nombre</label>
                        <input type="text" id="username" name="username" defaultValue={userDetails.username} />
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" defaultValue={userDetails.email} />
                        <label htmlFor="mobile">Número de teléfono</label>
                        <input type="tel" id="mobile" name="mobile" defaultValue={userDetails.mobile} />
                        <label htmlFor="role">Rol</label>
                        <select id="role" name="role" defaultValue={userDetails.role}>
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                        <label htmlFor="active">Activo</label>
                        <select id="active" name="active" defaultValue={userDetails.active}>
                            <option value="true">Sí</option>
                            <option value="false">No</option>
                        </select>
                    </form> 
                </>
            )}
        </>
    );
}

export default UserDetailsEdit;