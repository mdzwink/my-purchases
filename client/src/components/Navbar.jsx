import { useEffect, useState } from "react";
import Button from "./Button";


export default function Navbar(props) {
  const { user, cookies, handleLogout } = props;

  return (
      <ul className="navbar">
        <li><h2>Purchases Hub</h2></li>
        <div className="menu-items">
          <li><Button>Add a Purchase</Button></li>
          <li><Button>About</Button></li>
          {user.email?
          <li>Logged in as: { user.email }</li>
          :
          <li><button>Login</button></li>
          }
          <li><button>Register</button></li>
          <li><button onClick={() => handleLogout()} >Sign-out</button></li>
        </div>
      </ul>
  )
}