import {useState, useEffect} from 'react';
import { getUserDetails, updateUserDetails } from '../utils/apiLagunpay.js';
import {useTheme} from '../context/ThemeContext';

function UserDetailsEdit({ editMode = true, setEditMode, save = false, setSave }) {
    const [userDetails, setUserDetails] = useState('');
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [error, setError] = useState('');
    const {theme} = useTheme();

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
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Verificar si la dirección de correo electrónico es válida
        const isValid = emailRegex.test(email);
        
        // Actualizar el estado de la validez de la dirección de correo electrónico
        setIsValidEmail(isValid);
        fetchData();

    }, [email]);

    const handleChange = (e) => {
        setEmail(e.target.value);
      };

    const handleSubmit = async (event) => {
        setSave(false);
        setError('');
        const form = document.getElementById('editUser');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
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
                    <form id='editUser'>
                    <div className="mb-3">
                        <label htmlFor="username" className='form-label'>
                            Nombre
                            <input type="text" id="username" name="username" className='form-control' defaultValue={userDetails.username} />
                        </label>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className='form-label'>
                            Email
                            <input type="email" id="email" name="email" required className='form-control' defaultValue={userDetails.email} onChange={handleChange}/>    
                        </label>
                        {!isValidEmail && <p>Formato de email incorrecto.</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="mobile" className='form-label'>
                            Número de teléfono
                            <input type="tel" id="mobile" name="mobile" className='form-control' defaultValue={userDetails.mobile} />
                        </label>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className='form-label'>
                            Nueva contraseña
                            <input type="password" id="password" name="password" className='form-control'/>
                        </label>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="passwordVerify" className='form-label'>
                            Repita la contraseña
                            <input type="password" id="passwordVerify" name="passwordVerify" className='form-control' />
                        </label>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="role" className='form-label'>
                            Rol
                            <select id="role" className='form-select' name="role" defaultValue={userDetails.role}>
                                <option value="user">Usuario</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </label>
                        
                    </div>

                    <div className="mb-3 col">
                        <label htmlFor="active" className='form-label'>
                            Activo
                                <select id="active" className='form-select' name="active" defaultValue={userDetails.active}>
                                    <option value="true">Sí</option>
                                    <option value="false">No</option>
                                </select>
                            </label>
                    </div>

                    <div className="mb-3">

                        <button type="submit" className={"btn btn-" + theme} form='editUser' onClick={(event) => {
                            event.preventDefault();
                            handleSubmit(event);
                        }}>Guardar cambios</button>
                    </div>
                    <div className="mb-3">
                        <button type="button" className={"btn second-button btn-" + theme} onClick={() => {
                            setEditMode(false)
                        }}>Descartar cambios</button>
                    </div>
                    </form> 
                </>
            )}
        </>
    );
}


export default UserDetailsEdit;