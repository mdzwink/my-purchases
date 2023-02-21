import React, { useState, useEffect } from 'react';
import './App.css';
import { useCookies } from 'react-cookie';
import Dashboard from './components/Dashboard'
import Home from './components/Home';
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
  const [darkMode, setDarkMode] = useState(true);
  const [loginRegister, setLoginRegister] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [receipts, setReceipts] = useState([]);
  const [addReceiptActive, setAddReceiptActive] = useState(false);


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
      <Navbar darkMode={darkMode} setLoginRegister={setLoginRegister} user={user} handleLogout={handleLogout} setReceipts={setReceipts} addReceiptActive={addReceiptActive} setAddReceiptActive={setAddReceiptActive} />
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} user={user} setUser={setUser} loginRegister={loginRegister} setLoginRegister={setLoginRegister} />} />
        <Route path="/dashboard" element={<Dashboard darkMode={darkMode} user={user} setReceipts handleLogout={handleLogout} cookies={cookies} setCookie={setCookie} removeCookie={removeCookie} setUser={setUser} searchQuery={searchQuery} setSearchQuery={setSearchQuery} receipts={receipts} setReceipts={setReceipts} />} />
        <Route path="/about" element={<About darkMode={darkMode} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;