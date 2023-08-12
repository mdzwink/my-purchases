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
  const [addReceiptMode, setAddReceiptMode] = useState(false);
  
  const handleLogin = () => {
    setUser({email: cookies.email, id: cookies.user_id });
  }

  const handleLogout = () => {
    removeCookie('email');
    removeCookie('user_id');
    setUser('');
  }

  const addFormToggle = () => {
    addReceiptMode ? setAddReceiptMode(false) : setAddReceiptMode(true);
  }

  return (
    <BrowserRouter>
      <Navbar 
        darkMode={darkMode} 
        setLoginRegister={setLoginRegister} 
        user={user} 
        handleLogout={handleLogout} 
        addFormToggle={addFormToggle} 
        setAddReceiptMode={setAddReceiptMode} 
      />
      <Routes>
        <Route path="/" element={
          <Home 
            darkMode={darkMode} 
            user={user} 
            loginRegister={loginRegister} 
            setLoginRegister={setLoginRegister} 
            handleLogin={handleLogin} 
          />} 
        />
        <Route path="/dashboard" element={
          <Dashboard 
            darkMode={darkMode} 
            user={user}
            handleLogout={handleLogout}
            cookies={cookies}
            setCookie={setCookie}
            removeCookie={removeCookie}
            setUser={setUser} 
            addReceiptMode={addReceiptMode}
            addFormToggle={addFormToggle}
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />} 
        />
        <Route path="/about" element={<About darkMode={darkMode} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;