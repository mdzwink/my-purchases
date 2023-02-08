import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginRegister from "./LoginRegister";
import Register from "./Register";
import Welcome from "./Welcome";

export default function Home(props) {
  const {darkMode, user, setUser, loginRegister, setLoginRegister} = props;

  const navigate = useNavigate();
  if (user) {
    navigate('/dashboard')
  }

  return (
    <>
      <main>
        <div className="home-container">
          <div className="welcome-fade-in"></div>
          <div className="home-morph">
            {loginRegister === 'login' ? 
              <LoginRegister setUser={() => setUser} loginRegister={loginRegister} setLoginRegister={setLoginRegister} /> 
            : 
              loginRegister === 'register' ?
                <Register setUser={() => setUser} loginRegister={loginRegister} setLoginRegister={setLoginRegister}/>
              : 
                <Welcome />}
          </div>
        </div>
      </main>
    </>
  );
}