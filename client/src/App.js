import React, { useState, useEffect } from 'react';
import './App.css';
import { useCookies } from 'react-cookie';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import View from './components/View';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const { email } = cookies;
  const [user, setUser] = useState({ 'email': email });
  
  const handleLogout = () => {
    console.log('handleLogout click');
    removeCookie('email');
    setUser({});
  }

  return (
    <div className="App">
      <Navbar cookies={cookies} handleLogout={handleLogout} />
      <Welcome />
      <View cookies={cookies} setCookie={setCookie} removeCookie={removeCookie} />
    </div>
  );
}

export default App;
