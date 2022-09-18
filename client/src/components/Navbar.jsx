

export default function Navbar(props) {
  const { user, handleLogout} = props;
  let email = '';
  if (user) {
    email = user.email
  }
  return (
      <ul className="navbar">
        <li><h2>Purchases Hub</h2></li>
        <div className="menu-items">
          <li><button>About</button></li>
          {email?
            <div className="menu-items">
              <li><button>Add a Purchase</button></li>
              <li>Logged in as: { email }</li>
              <li><button onClick={() => handleLogout()} >Sign-out</button></li>
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