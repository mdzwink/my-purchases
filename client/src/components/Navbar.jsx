import { useNavigate } from 'react-router-dom';
import './Navbar.css'

export default function Navbar(props) {
  const { user, handleLogout} = props;
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
      <ul className="navbar" >
        <li><div className='logo' onClick={() => handleLogoClick()} >Purchase Hub</div></li>
        <div className="menu-items" >
          <li><button className="nav-button" onClick={() => navigate('/')} >Home</button></li>
          <li><button className="nav-button" onClick={() => navigate('/about')} >About</button></li>
          {email?
            <div className="menu-items" >
              <li><button className='nav-button' onClick={() => navigate('/dashboard')} >Dashboard</button></li>
              <li className="logged-in-as" >{ email } <button className="nav-button" onClick={() => handleLogoutButton()} >Sign-out</button></li>
            </div>
            :
            <div className="menu-items" >
              <li><button className='nav-button' onClick={() => navigate('/login')} >Login</button></li>
              <li><button className='nav-button' onClick={() => navigate('/register')}>Register</button></li>
            </div>
          }
        </div>
      </ul>
  )
}