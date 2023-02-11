import React, { useState } from "react";
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useNavigate } from "react-router-dom";
import './LoginRegister.css';
import { useCookies } from "react-cookie";


export default function LoginRegister(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const { setUser, setLoginRegister } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const clearForm = () => {
    setEmail('');
    setPassword('');
  }

  const wrongCreds = "Error, user credentials don't match"
  
  const handleLogin = (e) => {
    e.preventDefault();
    //resetting formError
    setFormError('');
    //setting form error if not all fields are filled upon submission
    if (!email || !password) {
      return setFormError(wrongCreds);
    }
    //send request to db to confirm that email and (hashed) password match stored user credentials
    axios.get('/login', {
      params: {
        email: email
      }
    })
    .then((res) => {
      if (!res.data[0]) {
        return setFormError(wrongCreds);
      }
      const hashedPwd = res.data[0].password
      const passwordCheck = bcrypt.compareSync(password, hashedPwd);
      if (!passwordCheck) {
        return setFormError(wrongCreds);
      }
      // unpack response
      const { id, email } = res.data[0];
      clearForm();
      // set cookies and user
      setUser({ email: email, id: id });
      setCookie('user_id', id, { path: '/'});
      setCookie('email', email, { path: '/' });
      navigate('/dashboard');
    })
    .then(() => {
      return console.log(`${email} logged in 0-0`);
    })
    .catch(err => {
      return console.log("ERROR from get'/login'", err);
    })     
  }
  //either I am reading the info the wrong way or updating at the wrong time
  const handleRegisterClick = (e) => {
    e.preventDefault()
    setLoginRegister('register');
  }

  return (
        <form className='login'>
          <label className="form-label" >Login</label>
          <label>*username</label>
          <input 
            type="text"
            onChange={e => setEmail(e.target.value)}
            value={email}
          ></input>
          <label>*password</label>
          <input 
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          ></input>
          {formError && <div className="form-error">{formError}</div>}
          <button className="form-button" onClick={(e) => handleLogin(e)}>LoginRegister</button>
          <p>Don't have an account? Click <button className="go-to-register" onClick={(e) => handleRegisterClick(e)}>here</button> to register!</p>
        </form>
  );
}