import React, { useState } from "react";
import './Signin.css';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signinError, setSigninError] = useState('');
  const [signedIn, setSignedIn] = useState(false);


  const handleForm = (e) => {
    e.preventDefault();
    //resetting formError
    setSigninError('');
    if (email && password) {

      const newSignin = {
        email,
        password
      }
  
      const clearForm = () => {
        setEmail('');
        setPassword('');
      }
  
      //send request to db to confirm that email and (hashed) password match stored user credentials
      axios.post('/signin', newSignin)
           .then((res) => {
             //set session
             clearForm();
           })
           .then(() => {
           })
           .catch(err => {
            console.log("ERR from post'/signin'", err)
           })
      
      
      return 'ok';     
    }
    //setting form error if not all fields are filled upon submission
    if (!email || !password) {
      return setSigninError("Error, user credentials don't match");
    }

  }

  return (
    <>
      <form>
        <label>Signin</label>
        <input 
          type="text" 
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          ></input>
        <input 
          type="text" 
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          ></input>
      </form>
      {signinError && <div className="form-error">{signinError}</div>}
      <button onClick={handleForm}>Custom Button</button>
    </>
  );
}