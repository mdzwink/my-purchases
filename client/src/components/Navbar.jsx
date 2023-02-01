import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import './Button.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faDragon, faFire, faMoon, faPlus, faSun } from '@fortawesome/free-solid-svg-icons';
import { faGit, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';


export default function Navbar(props) {
  const { darkMode, user, handleLogout, setAddReceipt} = props;
  const [avatarDropdown, setAvatarDropdown] = useState(false)
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
  const handleAvatarClick = () => {
    avatarDropdown ? setAvatarDropdown(false) : setAvatarDropdown(true);
  }
  return (
    <header>
      <ul className={darkMode ? 'navbar dm' : 'navbar'} >
        <div className={avatarDropdown ? "close-dropdown active" : "close-dropdown"} onClick={() => handleAvatarClick()}></div>
        <li><div className={darkMode ? 'logo dm' : 'logo'} onClick={() => handleLogoClick()} >MP</div></li>
        <div className={darkMode ? 'menu-items dm' : 'menu-items'} >
          <li><button className={darkMode ? 'nav-btn dm' : 'nav-btn'} onClick={() => navigate('/')} >Home</button></li>
          <li><button className={darkMode ? 'nav-btn dm' : 'nav-btn'} onClick={() => navigate('/about')} >About</button></li>
          {email?
            // showing avatar and username with quick action dropdown when logged in
            <div className={darkMode ? 'menu-items dm' : 'menu-items'} >
              <li><button className={darkMode ? 'nav-btn dm' : 'nav-btn'} onClick={() => navigate('/dashboard')} >Dashboard</button></li>
              <li className={darkMode ? 'logged-in-as dm' : 'logged-in-as'} >
                <div className="avatar" onClick={() => handleAvatarClick()}>
                  <img src='/images/avatar-placeholder.jpg' alt='user avatar'/>
                </div>
                <div className={avatarDropdown ? "avatar-dropdown active" : "avatar-dropdown"}>
                  <ul>
                    <li><button className={darkMode ? 'nav-btn dm' : 'nav-btn'}>Welcome&nbsp;{ email }</button></li>
                    <li><button className={darkMode ? 'nav-btn dm' : 'nav-btn'} onClick={setAddReceipt(true)}>Add <FontAwesomeIcon icon={faPlus} /></button></li>
                    <li><button className={darkMode ? 'nav-btn dm' : 'nav-btn'}>Profile</button></li>
                        <div className={darkMode ? 'nav-btn dm' : 'nav-btn'}></div>
                    <li><button className={darkMode ? 'nav-btn dm' : 'nav-btn'}><FontAwesomeIcon icon={faCog} />&nbsp;Settings&nbsp;&nbsp;{darkMode ? <FontAwesomeIcon icon={faMoon} className='dm' /> : <FontAwesomeIcon icon={faSun} className='dm' />}</button></li>
                    <li><button className={darkMode ? 'nav-btn dm' : 'nav-btn'} onClick={() => handleLogoutButton()} >Sign-out</button></li>
                    <li className='connect'>
                      <section>
                        <div className={darkMode ? 'nav-btn dm' : 'nav-btn'}><div className='dragon-dungon'><FontAwesomeIcon icon={faDragon} className='dragon' /><FontAwesomeIcon icon={faFire} id='dragon-breath' /></div></div>
                        <div className={darkMode ? 'nav-btn dm' : 'nav-btn'}><FontAwesomeIcon icon={faGit} className='git' /></div>
                        <div className={darkMode ? 'nav-btn dm' : 'nav-btn'}><FontAwesomeIcon icon={faLinkedin} className='li' /></div>
                        <div className={darkMode ? 'nav-btn dm' : 'nav-btn'}><FontAwesomeIcon icon={faInstagram} className='ig' /></div>
                      </section>
                      <div className={darkMode ? 'nav-btn dev dm' : 'nav-btn dev'}>connect with dev</div>
                    </li>
                  </ul>
                </div>
              </li>
              {/* user div with dropdown list showing 1. logout 2. quick add receipt 3. view profile and stats */}
            </div>
            :
            // showing login and register buttons when logged out
            <div className={darkMode ? 'menu-items dm' : 'menu-items'} >
              <li><button className={darkMode ? 'nav-btn dm' : 'nav-btn'} onClick={() => navigate('/login')} >Login</button></li>
              <li><button className={darkMode ? 'nav-btn dm' : 'nav-btn'} onClick={() => navigate('/register')}>Register</button></li>
            </div>
          }
        </div>
      </ul>
    </header>
  )
}