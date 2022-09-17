import React, { useEffect, useState } from "react";
import axios from 'axios';
import bcrypt from 'bcryptjs';


export default function Register(props) {
  const { cookies, setCookie, setUser} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  
  // package email and password for use in db queries
  const user = {
    email: email,
    password: password // <hash
  }
  // clears email and password state. used upon successful login or registration
  const clearForm = () => {
    setEmail('');
    setPassword('');
  }

  // returns true if user already exists, returns false if user does not exist
  const registerNewUser = () => { //<< should make seperate route for varification that only looks for necessary peramiters
        //send request to db to confirm that email and (hashed) password don't already exist
        axios.post('/register', user)
        .then((res) => {
          clearForm();
          // set cookies
          let test = cookies.email
          console.log('TEST',test)
          setCookie('email', email, { path: '/' });
          setUser(email)
          return console.log(`${email}: has been registered!`);
        })
        .catch(err => {
          alert('sorry, something went wrong')
          return console.log("ERR from FRONT post'/register'", err);
        })
  }
  
  //issue
  // need to varify email available before proceeding with register

  const handleRegister = (e) => {
    e.preventDefault();
    //resetting formError
    setFormError('');
    
    //setting form error if email already exists
    //setting form error if not all fields are filled upon submission
    if (email.length < 6) {
      return setFormError("Please enter an email");
    }
    if (password.length < 3) {
      return setFormError("Please enter a password");
    }
    // if (!varifyUserAvailable(user.email)) {
    //   return setFormError("Email already exists") // <<< add reroute to login page/form
    // }
    axios.get('/emailIsTaken', {
      params: {
        email: email
      }
    })
    .then((res) => {
      console.log('emailIsTaken output>', res.data)
      if (res.data) {
        return console.log('Email is taken :(... but here is a heart, <3')
      }
      return registerNewUser();
    })
    .catch(err => {
      return console.log("ERR from verifyUserExists()'", err);
    })    
  }
  
  return (
    <>
      <form>
        <label>Register</label>
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
          <input 
          type="password"
          placeholder="confirm password"
          onChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          ></input>
      </form>
      {formError && <div className="form-error">{formError}</div>}
      <button onClick={handleRegister}>Register</button>
    </>
  );
}