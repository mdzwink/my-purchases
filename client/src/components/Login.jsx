import React, { useState } from "react";
import axios from 'axios';
import bcrypt from 'bcryptjs';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [signedIn, setSignedIn] = useState(false);


  const handleForm = (e) => {
    e.preventDefault();
    //resetting formError
    setFormError('');
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
      axios.get('/login', {
        params: {
          email: email,
          password: password
        }
      })
        .then((res) => {
          //set session
          console.log(res.data)
          if (!res.data) {
            return console.log('wrong creds!')
          }
          clearForm();
          return console.log('Login res from back:', res.data);
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
      <button onClick={handleForm}>Custom Button</button>
    </>
  );
}