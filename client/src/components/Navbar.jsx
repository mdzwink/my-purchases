import { useEffect, useState } from "react";
import Button from "./Button";


export default function Navbar(props) {
  const { cookies, handleLogout } = props;
  const { email } = cookies;

 



  return (
      <ul className="navbar">
        <li><h2>Purchases Hub</h2></li>
        <div className="menu-items">
          <li><Button>Add a Purchase</Button></li>
          <li><Button>About</Button></li>
          <li>Logged in as: { email }</li>
          <li><Button>Sign-up</Button></li>
          <li><Button>Sign-in</Button></li>
          <li><button onClick={() => handleLogout()} >Sign-out</button></li>
        </div>
      </ul>
  )
}