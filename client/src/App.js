import React, { useState, useEffect } from 'react';
import './App.css';
import { useCookies } from 'react-cookie';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import View from './components/View';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [user, setUser] = useState(cookies.email);


  useEffect(() => {
    setUser(cookies.email);
    console.log('cookies:', cookies)
    console.log('user:', user)
  }, [cookies])

  const handleLogout = () => {
    console.log('handleLogout click');
    removeCookie('email');
    setUser('');
    console.log('>>>',cookies)
  }


  return (
    <div className="App">
      <Navbar user={user} handleLogout={handleLogout} />
      <Welcome />
      <View handleLogout={handleLogout} cookies={cookies} setCookie={setCookie} removeCookie={removeCookie} setUser={setUser} />
    </div>
  );
}

export default App;