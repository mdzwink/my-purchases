import React, { useState } from "react";
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useNavigate } from "react-router-dom";
import './LoginRegister.css';
import { useCookies } from "react-cookie";
import { getReceipts } from './helpers'
import Loading from "./Loading";



export default function Login(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const { setUser, setLoginRegister, user, setReceipts } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const clearForm = () => {
    setEmail('');
    setPassword('');
  }

  const verifyCreds = async (user) => {
    const wrongCreds = "Error, user credentials don't match"
    if (!user.email) {
      return setFormError(wrongCreds);
    }
    const hashedPwd = user.password;
    const passwordCheck = bcrypt.compareSync(password, hashedPwd);
    if (!passwordCheck) {
      return setFormError(wrongCreds);
    }
    return console.log('user varified!');
  }
  const loginEvents = async (user) => {
    const { id, email } = user;
    clearForm();
    // set cookies and user
    setUser({ email: email, id: id });
    setCookie('user_id', id, { path: '/'});
    setCookie('email', email, { path: '/' });
    return 'login events complete';
  }
  
  const handleLoginClick = (e) => {
    e.preventDefault();
    const wrongCreds = "Error, user credentials don't match"
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
    .then(res => {
      const user = res.data[0];
      verifyCreds(user)
      .then(() => {
        setLoading(true);
        loginEvents(user)
        .then(() =>{
          setLoading(false);
          navigate('/dashboard');
        })
      })
    })
    .catch(err => {
      return console.log("ERROR from get'/login'", err);
    })     
  }
  //either I am reading the info the wrong way or updating at the wrong time
  const handleRegisterClick = (e) => {
    e.preventDefault();
    setLoginRegister('register');
  }
  return (
    <form className='login'>
    {loading ? 
      <Loading />
     :
      <>
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
        <button className="form-button" onClick={(e) => handleLoginClick(e)}>Login</button>
        <p>Don't have an account? Click <button className="go-to-register" onClick={(e) => handleRegisterClick(e)}>here</button> to register!</p>
      </>
    }
    </form>
  );
}