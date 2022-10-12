import React, { useState, useEffect } from 'react';
import './App.css';
import { useCookies } from 'react-cookie';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Home from './components/Home';
// import ReactDOM from "react-dom/client";
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} addingReceipt={addingReceipt} setAddingReceipt={setAddingReceipt} handleLogout={handleLogout} cookies={cookies} setCookie={setCookie} removeCookie={removeCookie} setUser={setUser}/>} />
        <Route path="/login" element={<Login setCookie={setCookie} setUser={setUser} />} />
        <Route path="/register" element={<Register cookies={cookies} setCookie={setCookie} setUser={setUser} />} />
        <Route path="/about" element={<About />} />

        {/* <Route path="users" element={<Users />}>
          <Route path="me" element={<OwnUserProfile />} />
          <Route path=":id" element={<UserProfile />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );


  // return (
  //   <div className="App">
  //     <Navbar user={user} handleLogout={handleLogout} />
  //     <main>
  //       <div className='welcome-text'>Welcome to your purchase hub</div>
  //       <Welcome />
  //       <Home user={user} addingReceipt={addingReceipt} setAddingReceipt={setAddingReceipt} handleLogout={handleLogout} cookies={cookies} setCookie={setCookie} removeCookie={removeCookie} setUser={setUser} />
  //     </main>
  //   </div>
  // );
}

export default App;