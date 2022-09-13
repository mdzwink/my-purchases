import React, { useState } from "react";
import axios from 'axios';
import bcrypt from 'bcryptjs';


export default function Login(props) {
  const { setCookie } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');


  const handleLogin = (e) => {
    e.preventDefault();
    //resetting formError
    setFormError('');
    if (email && password) {
      
      const clearForm = () => {
        setEmail('');
        setPassword('');
      }
      
      //send request to db to confirm that email and (hashed) password match stored user credentials
      axios.get('/login', {
        params: {
          email: email,
          password: password
        }
      })
      .then((res) => {
        if (!res.data[0]) {
          console.log('IF-NO-USER>>',res.data[0]);
          return setFormError("Error, user credentials don't match");
        }
        // unpack response
        const { id, email } = res.data[0];
        // clearForm();
        // set cookies
        setCookie('email', email, { path: '/' });
        return console.log('Login res from back:', res.data[0]);
      })
      .catch(err => {
        console.log("ERR from post'/signin'", err);
      })
      
      return 'ok';     
    }
    //setting form error if not all fields are filled upon submission
    if (!email || !password) {
      return setFormError("Error, user credentials don't match");
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
          type="password"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          ></input>
      </form>
      {formError && <div className="form-error">{formError}</div>}
      <button onClick={handleLogin}>Custom Button</button>
    </>
  );
}