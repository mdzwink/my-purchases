import React, { useState } from "react";
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useNavigate } from "react-router-dom";
import './LoginRegister.css';
import { useCookies } from "react-cookie";
import Loading from "./Loading";



export default function Login(props) {
  const [cookie, setCookie ] = useCookies(['user']);
  const { setUser, setLoginRegister, handleLogin } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const clearForm = () => {
    setEmail('');
    setPassword('');
  }

  const verifyCreds = (user) => {
    const wrongCreds = "Error, user credentials don't match"
    if (!user.email) {
      return setFormError(wrongCreds);
    }
    const hashedPwd = user.password;
    const passwordCheck = bcrypt.compareSync(password, hashedPwd);
    if (!passwordCheck) {
      return setFormError(wrongCreds);
    }
    return 'varified';
  }
  const loginEvents = (user) => {
    const { id, email } = user;
    // set cookies and user
    setUser({ email: email, id: id });
    setCookie('user_id', id, { path: '/'});
    setCookie('email', email, { path: '/' });
    clearForm();
    handleLogin();
    return 'login events complete';
  };
  
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
    setLoading(true);
    axios.get('/login', {
      params: {
        email: email
      }
    })
    .then(res=>{
      const user = res.data[0];
      verifyCreds(user);
      return user;
    })
    .then((user)=>{
      loginEvents(user);
      setLoading(false);
      navigate('/dashboard');
    })
    .then(()=>{

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
        required
        ></input>
        <label>*password</label>
        <input 
        type="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
        required
        ></input>
        {formError && <div className="form-error">{formError}</div>}
        <button className="form-button" onClick={(e) => handleLoginClick(e)}>Login</button>
        <p>Don't have an account? Click <button className="go-to-register" onClick={(e) => handleRegisterClick(e)}>here</button> to register!</p>
      </>
    }
    </form>
  );
}