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
  const handleAboutButton = () => {
    navigate('/about');
  }
  const handleLoginNav = () => {
    navigate('/login'); 
  }
  const handleRegisterNav = () => {
    navigate('/register'); 
  }
  

  return (
      <ul className="navbar" >
        <li><div className='logo' >Purchase Hub</div></li>
        <div className="menu-items" >
          <li><button className="nav-button" onClick={() => handleAboutButton()} >About</button></li>
          {email?
            <div className="menu-items" >
              <li className="logged-in-as" >Logged in as: { email } <button className="nav-button" onClick={() => handleLogoutButton()} >Sign-out</button></li>
            </div>
            :
            <div className="menu-items" >
              <li><button onClick={() => handleLoginNav()} >Login</button></li>
              <li><button onClick={() => handleRegisterNav()}>Register</button></li>
            </div>
          }
        </div>
      </ul>
  )
}