import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
// import LoginRegister from "./LoginRegister";

import Register from "./Register";
import Welcome from "./Welcome";

export default function Home(props) {
  const {darkMode, user, setUser, loginRegister, setLoginRegister} = props;

  const navigate = useNavigate();

  // useEffect(()=>{
  //   console.log('user', user)
  //   if (user.email) {
  //     navigate('/dashboard')
  //   }
  // }, [])

  return (
    <>
      <main>
        <div className="home-container">
          <div className="welcome-fade-in"></div>
          <div className="home-morph">
            {loginRegister === 'login' ? 
              <Login user setUser={setUser} loginRegister={loginRegister} setLoginRegister={setLoginRegister} /> 
            : 
              loginRegister === 'register' ?
                <Register setUser={() => setUser} loginRegister={loginRegister} setLoginRegister={setLoginRegister}/>
              : 
                <Welcome />
            }
          </div>
        </div>
      </main>
    </>
  );
}