import React, { useState } from "react";
import axios from 'axios';
import bcrypt from 'bcryptjs';
import Welcome from "./Welcome";
import { useNavigate } from "react-router-dom";


export default function Register(props) {
  const { setCookie, setUser} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();
  
  const submittedPassword = bcrypt.hashSync(password, 10);
  // package email and password for use in db queries
  const user = {
    email: email,
    password: submittedPassword // <hash
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
          const id = res.data.id;
          const email = res.data.email;
          clearForm();
          // set cookies
          setUser({ email: email, id: id });
          setCookie('user_id', id, { path: '/'});
          setCookie('email', email, { path: '/' });
          navigate('/');
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
    if (password !== confirmPassword) {
      return setFormError("Passwords don't match!")
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
        setFormError("This email is already registered.")
        return console.log('Email is taken :(... but here is a heart, <3')
      }
      return registerNewUser();
    })
    .catch(err => {
      return console.log("ERR from verifyUserExists()'", err);
    })    
  }
  
  return (
    <main>
      <Welcome />
      <section className="logged-out-view" >
        <form>
          <label className="form-label" >Register</label>
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
            {formError && <div className="form-error">{formError}</div>}
            <button className="form-button" onClick={handleRegister}>Register</button>
        </form>
      </section>
    </main>
  );
}