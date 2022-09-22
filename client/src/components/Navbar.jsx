import './Navbar.css'

export default function Navbar(props) {
  const { user, handleLogout} = props;
  let email = '';
  if (user) {
    email = user.email
  }
  return (
      <ul className="navbar">
        <li><div className='logo'>Purchase Hub</div></li>
        <div className="menu-items">
          <li><button className="nav-button"  >About</button></li>
          {email?
            <div className="menu-items">
              <li className='logged-in-as'>Logged in as: { email } <button className="nav-button" onClick={() => handleLogout()} >Sign-out</button></li>
            </div>
            :
            <div className="menu-items">
              {/* <li><button>Login</button></li>
              <li><button>Register</button></li> */}
            </div>
          }
        </div>
      </ul>
  )
}