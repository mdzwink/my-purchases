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
  const [addFormActive, setAddingReceipt] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  
  const [user, setUser] = useState({ email: cookies.email, id: cookies.user_id });
  // const userState = useSelector(state => state.user);

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
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setCookie={setCookie} setUser={setUser} />} />
        <Route path="/register" element={<Register cookies={cookies} setCookie={setCookie} setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} addFormActive={addFormActive} setAddingReceipt={setAddingReceipt} handleLogout={handleLogout} cookies={cookies} setCookie={setCookie} removeCookie={removeCookie} setUser={setUser} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;