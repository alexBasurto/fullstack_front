import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { logoutApi } from '../utils/apiLagunpay';
import obtenerIniciales from '../utils/obtenerIniciales';

function Header() {
    const { session, setSession } = useSession();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutApi()
        .then(response => {
            setSession(null);
            navigate('/');
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <header>
            <h1>LagunPay</h1>
            <nav>
                <ul>
                    <li><Link to="/">Hogar</Link></li>
                    {session ? 
                    <>
                    <li><Link to="/my-groups">My Groups</Link></li>
                    </>
                    : null}
                    <li>
                    {session ? <a onClick={handleLogout}>Logout</a> : <Link to="/login">Login</Link>}
                    </li>
                    <li><Link to="/user-details">
                        {session && <div className='userInitials'>{obtenerIniciales(session.username)}</div>}    
                    </Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;