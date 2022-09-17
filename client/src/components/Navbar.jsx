

export default function Navbar(props) {
  const { user, handleLogout, cookies} = props;
  console.log('COOKIES set?:', cookies)
  return (
      <ul className="navbar">
        <li><h2>Purchases Hub</h2></li>
        <div className="menu-items">
          <li><button>Add a Purchase</button></li>
          <li><button>About</button></li>
          {user?
            <li>Logged in as: { user }</li>
            :
            <div>
              <li><button>Login</button></li>
              <li><button>Register</button></li>
            </div>
          }
          <li><button onClick={() => handleLogout()} >Sign-out</button></li>
        </div>
      </ul>
  )
}