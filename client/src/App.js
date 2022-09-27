import React, { useState, useEffect } from 'react';
import './App.css';
import { useCookies } from 'react-cookie';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import View from './components/View';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [user, setUser] = useState({ email: cookies.email, id: cookies.user_id });
  const [addingReceipt, setAddingReceipt] = useState(false);
  useEffect(() => {
    setUser({email: cookies.email, id: cookies.user_id });
  }, [cookies])

  const handleLogout = () => {
    removeCookie('email');
    removeCookie('user_id');
    setUser('');
  }

  return (
    <div className="App">
      <Navbar user={user} handleLogout={handleLogout} />
      <main>
        <div className='welcome-text'>Welcome to your purchase hub</div>
        <Welcome />
        <View user={user} addingReceipt={addingReceipt} setAddingReceipt={setAddingReceipt} handleLogout={handleLogout} cookies={cookies} setCookie={setCookie} removeCookie={removeCookie} setUser={setUser} />
      </main>
    </div>
  );
}

export default App;