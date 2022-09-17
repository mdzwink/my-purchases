import { useEffect } from "react";


export default function Navbar(props) {
  const { user, handleLogout, cookies} = props;
  
  // let loggedIn = false;
  // useEffect(() => {
  //   loggedIn = true;
  // }, [user])
  return (
      <ul className="navbar">
        <li><h2>Purchases Hub</h2></li>
        <div className="menu-items">
          <li><button>Add a Purchase</button></li>
          <li><button>About</button></li>
          {user?
            <div>
              <li>Logged in as: { user }</li>
              <li><button onClick={() => handleLogout()} >Sign-out</button></li>
            </div>
            :
            <div>
              <li><button>Login</button></li>
              <li><button>Register</button></li>
            </div>
          }
        </div>
      </ul>
  )
}