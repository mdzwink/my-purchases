import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import './Button.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faDragon, faFire, faMoon, faPlus, faSun } from '@fortawesome/free-solid-svg-icons';
import { faGit, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useCookies } from 'react-cookie';
import BackgroundFade from './BackgroundFade';


export default function Navbar(props) {
  const { darkMode, user, handleLogout, setLoginRegister, addFormToggle} = props;
  const [cookies] = useCookies(['user']);

  const [varified, setVarified] = useState(false)
  const [avatarDropdownMode, setAvatarDropdownMode] = useState(false)
  const navigate = useNavigate();
  let email = '';
  useEffect(()=>{
    if (user) {
      email = user.email
    } else {
      navigate('/')
    }
  },[user])

  const closeMenu = () => setAvatarDropdownMode(false);
  const handleSignOutButton = () => {
    navigate('/');
    handleLogout();
  }
  const handleLogoClick = () => {
    user.email? navigate('/dashboard') : navigate('/');
  }
  // either pass true or false if you want it to setAvatarDropdownMode to the opposite, or pass it avatarDropdownMode to toggle based on current state
  const handleAvatarClick = () => {
    avatarDropdownMode ? setAvatarDropdownMode(false) : setAvatarDropdownMode(true);
  }
  const handleAddFormClick = (e) => {
    e.preventDefault();
    addFormToggle();
    setAvatarDropdownMode(false);
  }

  useEffect(() => {
    user ? setVarified(true) : setVarified(false)
    console.log('user change')
  }, [user])

  return (
    <header>
      <ul className={darkMode ? 'navbar dm' : 'navbar'} >
        {/* problem below with function call or state #issue01*/}
        {/* <div className={avatarDropdownMode ? "close-dropdown active" : "close-dropdown"} onClick={() => handleAvatarClick()}></div>
        <div className={avatarDropdownMode ? "close-addForm active" : "close-addForm"} onClick={() => handleAddFormClick()}></div> */}
        <li><div className={darkMode ? 'logo dm' : 'logo'} onClick={() => handleLogoClick()} >receipt keeper</div></li>
        <div className={darkMode ? 'menu-items dm' : 'menu-items'} >
          {varified?
            // showing avatar and username with quick action dropdown when logged in
            <div className={darkMode ? 'menu-items dm' : 'menu-items'} >
              <li><button className={darkMode ? 'nav-btn dm' : 'nav-btn'} onClick={(e) => handleAddFormClick(e)} > Add <FontAwesomeIcon icon={faPlus} /></button></li>
              {/* <li className={darkMode ? 'nav-btn dm' : 'nav-btn'}>Welcome&nbsp;{ email } </li> */}
              <li>
                {/* {addReceiptMode?
                  <AddReceiptForm user={user} cookies={cookies} setReceipts={setReceipts} setAddReceiptMode={setAddReceiptMode}/>
                :
                  <></>
                } */}
              </li>
              <li className={darkMode ? 'logged-in-as dm' : 'logged-in-as'} >
                <div className="avatar" onClick={() => handleAvatarClick()}>
                  <img src='/images/avatar-placeholder.jpg' alt='user avatar'/>
                </div>
                {/* avatar dropdown menu begins */}
                <div className={avatarDropdownMode ? "avatar-dropdown active" : "avatar-dropdown"}>
                  <ul>
                    {/* <li><button className={darkMode ? 'nav-btn dm' : 'nav-btn'} onClick={(e) => {setAddReceiptMode(true); handleAddFormClick(e, avatarDropdownMode)}}> Add <FontAwesomeIcon icon={faPlus} /></button></li> */}
                    <li><button className={darkMode ? 'nav-btn dm' : 'nav-btn'}>Profile</button></li>
                    <li><button className={darkMode ? 'nav-btn dm' : 'nav-btn'}><FontAwesomeIcon icon={faCog} />&nbsp;Settings&nbsp;&nbsp;{darkMode ? <FontAwesomeIcon icon={faMoon} className='dm' /> : <FontAwesomeIcon icon={faSun} className='dm' />}</button></li>
                    <li><button className={darkMode ? 'nav-btn dm' : 'nav-btn'} onClick={() => {handleSignOutButton(); closeMenu()}} >Sign-out</button></li>
                    <li className='connect'>
                      <section>
                        <div><div className='dragon-dungon'><FontAwesomeIcon icon={faDragon} className='dragon' /><FontAwesomeIcon icon={faFire} id='dragon-breath' /></div></div>
                        <div><FontAwesomeIcon icon={faGit} className='git' /></div>
                        <div><FontAwesomeIcon icon={faLinkedin} className='li' /></div>
                        <div><FontAwesomeIcon icon={faInstagram} className='ig' /></div>
                      </section>
                      <div className='dev'>connect with dev</div>
                    </li>
                  </ul>
                </div>
              </li>
              {/* user div with dropdown list showing 1. logout 2. quick add receipt 3. view profile and stats */}
            </div>
            :
            // showing login and register buttons when logged out
            <div className={darkMode ? 'menu-items dm' : 'menu-items'} >
              <li><button className={darkMode ? 'nav-btn dm' : 'nav-btn'} onClick={() => {navigate('/'); setLoginRegister(false)}} >Home</button></li>
              <li><button className={darkMode ? 'nav-btn dm' : 'nav-btn'} onClick={() => {navigate('/about'); setLoginRegister(false)}} >About</button></li>
              <li><button className={darkMode ? 'nav-btn dm' : 'nav-btn'} onClick={() => {navigate('/'); setLoginRegister('login')}} >Login</button></li>
              <li><button className={darkMode ? 'nav-btn dm' : 'nav-btn'} onClick={() => {navigate('/'); setLoginRegister('register')}}>Register</button></li>
            </div>
          }
        </div>
      </ul>
    </header>
  )
}