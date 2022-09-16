import React, { useState, useEffect } from 'react';
import './App.css';
import { useCookies } from 'react-cookie';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import View from './components/View';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [user, setUser] = useState({ 'email': cookies.email });
  
  const handleLogout = () => {
    console.log('handleLogout click');
    removeCookie('email');
    setUser({});
    console.log('>>>',cookies)
  }
  const settingUser = (d) => {
    console.log('d', user)
    setUser(d)
    console.log('d2', user)

  }
  

  return (
    <div className="App">
      <Navbar user={user} cookies={cookies} handleLogout={handleLogout} />
      <Welcome />
      <View handleLogout={handleLogout} setUser={settingUser} cookies={cookies} setCookie={setCookie} removeCookie={removeCookie} />
    </div>
  );
}

export default App;
