import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import './Button.css'

export default function Navbar(props) {
  const { darkMode, user, handleLogout} = props;
  let email = '';
  if (user) {
    email = user.email
  }
  const navigate = useNavigate();

  const handleLogoutButton = () => {
    navigate('/login');
    handleLogout();
  }

  const handleLogoClick = () => {
    user.email? navigate('/dashboard') : navigate('/');
  }
  

  return (
    <header>
      <ul className={darkMode ? 'navbar dm' : 'navbar'} >
        <li><div className={darkMode ? 'logo dm' : 'logo'} onClick={() => handleLogoClick()} >MP</div></li>
        <div className={darkMode ? 'menu-items dm' : 'menu-items'} >
          <li><button className={darkMode ? 'nav-button dm' : 'nav-button'} onClick={() => navigate('/')} >Home</button></li>
          <li><button className={darkMode ? 'nav-button dm' : 'nav-button'} onClick={() => navigate('/about')} >About</button></li>
          {email?
            <div className={darkMode ? 'menu-items dm' : 'menu-items'} >
              <li><button className={darkMode ? 'nav-button dm' : 'nav-button'} onClick={() => navigate('/dashboard')} >Dashboard</button></li>
              <li className={darkMode ? 'logged-in-as dm' : 'logged-in-as'} >{ email } <button className={darkMode ? 'nav-button dm' : 'nav-button'} onClick={() => handleLogoutButton()} >Sign-out</button></li>
            </div>
            :
            <div className={darkMode ? 'menu-items dm' : 'menu-items'} >
              <li><button className={darkMode ? 'nav-button dm' : 'nav-button'} onClick={() => navigate('/login')} >Login</button></li>
              <li><button className={darkMode ? 'nav-button dm' : 'nav-button'} onClick={() => navigate('/register')}>Register</button></li>
            </div>
          }
        </div>
      </ul>
    </header>
  )
}