import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { useTheme } from '../context/ThemeContext';
import { logoutApi } from '../utils/apiLagunpay';
import obtenerIniciales from '../utils/obtenerIniciales';

function Header() {
    const { session, setSession } = useSession();
    const { theme, setTheme } = useTheme();
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

    const handleThemeChange = (theme) => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
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
                <label htmlFor="theme-switch"></label>
                <input type="checkbox" id="theme-switch" onChange={() => {handleThemeChange(theme)}} />
                <p>{theme}</p>
            </nav>
        </header>
    )
}

export default Header;