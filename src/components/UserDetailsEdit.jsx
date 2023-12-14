import {useState, useEffect} from 'react';
import { getUserDetails, updateUserDetails } from '../utils/apiLagunpay.js';

function UserDetailsEdit({ editMode = true, setEditMode, save = false, setSave }) {
    const [userDetails, setUserDetails] = useState('');
    const [error, setError] = useState('');

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

    const handleSubmit = async (event) => {
        setSave(false);
        setError('');
        const form = document.getElementById('editUser');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log(data);
        try {
            if (data.password !== data.passwordVerify) {
                form.password.value = '';
                form.passwordVerify.value = '';
                throw new Error('Las contraseñas no coinciden.');
            }
            if (data.password === '') {
                delete data.password;
                delete data.passwordVerify;
            }
            const response = await updateUserDetails(data);
            if (!response.ok) {
                throw new Error('No se ha podido actualizar el usuario.');
            } else {
                setSave(true);
                setEditMode(false);
            }
        } catch (error) {
            console.error('Error en la peticion de usuario.', error.message);
            setError(error.message);
        }
    };

    return (
        <>
            {userDetails && (
                <>
                    {error && <p>{error}</p>}
                    <button type="button" onClick={() => {
                        setEditMode(false)
                    }}>Descartar cambios</button>
                    <form id='editUser'>
                        <label htmlFor="username">Nombre</label>
                        <input type="text" id="username" name="username" defaultValue={userDetails.username} />
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" defaultValue={userDetails.email} />
                        <label htmlFor="mobile">Número de teléfono</label>
                        <input type="tel" id="mobile" name="mobile" defaultValue={userDetails.mobile} />
                        <label htmlFor="password">Nueva contraseña</label>
                        <input type="password" id="password" name="password" />
                        <label htmlFor="passwordVerify">Repita la contraseña</label>
                        <input type="password" id="passwordVerify" name="passwordVerify" />
                        <label htmlFor="role">Rol</label>
                        <select id="role" name="role" defaultValue={userDetails.role}>
                            <option value="user">Usuario</option>
                            <option value="admin">Administrador</option>
                        </select>
                        <label htmlFor="active">Activo</label>
                        <select id="active" name="active" defaultValue={userDetails.active}>
                            <option value="true">Sí</option>
                            <option value="false">No</option>
                        </select>
                        <button type="submit" form='editUser' onClick={(event) => {
                            event.preventDefault();
                            handleSubmit(event);
                        }}>Guardar cambios</button>
                    </form> 
                </>
            )}
        </>
    );
}


export default UserDetailsEdit;