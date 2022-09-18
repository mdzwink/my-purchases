import React, { useState } from 'react';
import ReceiptList from './ReceiptList';
import Add from './Add';
import Login from './Login';
import Register from './Register';

export default function View(props) {
  const { user, cookies, setCookie, setUser} = props
  const [receipts, setReceipts] = useState([]);
  let email = '';
  if (user.email) {
    email = user.email;
  }
  return (
    <div className='view'>
      {user.email?
      <div>
        <Add user={user} cookies={cookies} setReceipts={setReceipts}/>
        <ReceiptList  user_id={user.id} cookies={cookies} receipts={receipts} setReceipts={setReceipts}/>
      </div>
      :
      <div>
        <h1>Welcome to Purchase Hub</h1>
        <Login cookies={cookies} setCookie={setCookie} setUser={setUser} />
        <Register cookies={cookies} setCookie={setCookie} setUser={setUser} />
      </div>
      }
    </div>
  )
}