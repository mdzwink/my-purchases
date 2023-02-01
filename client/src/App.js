import React, { useState, useEffect } from 'react';
import './App.css';
import { useCookies } from 'react-cookie';
import Dashboard from './components/Dashboard'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [user, setUser] = useState({ email: cookies.email, id: cookies.user_id });
  const [addingReceipt, setAddReceipt] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  console.log('cookies.email:', cookies.email)
  useEffect(() => {
    setUser({email: cookies.email, id: cookies.user_id });
  }, [cookies])

  const handleLogout = () => {
    removeCookie('email');
    removeCookie('user_id');
    setUser('');
  }


  return (
    <BrowserRouter>
      <Navbar darkMode={darkMode} user={user} handleLogout={handleLogout} setAddReceipt={setAddReceipt} />
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route path="/login" element={<Login darkMode={darkMode} setCookie={setCookie} setUser={setUser} />} />
        <Route path="/register" element={<Register darkMode={darkMode} cookies={cookies} setCookie={setCookie} setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard darkMode={darkMode} user={user} addingReceipt={addingReceipt} setAddReceipt={setAddReceipt} handleLogout={handleLogout} cookies={cookies} setCookie={setCookie} removeCookie={removeCookie} setUser={setUser} />} />
        <Route path="/about" element={<About darkMode={darkMode} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;