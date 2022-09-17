import React, { useState } from 'react';
import ReceiptList from './ReceiptList';
import Add from './Add';
import Login from './Login';
import Register from './Register';

export default function View(props) {
  const { cookies, setCookie, setUser} = props
  const [receipts, setReceipts] = useState([]);

  return (
    <div className='view'>
      {cookies.email?
      <Add cookies={cookies} setReceipts={setReceipts}/>
      :
      <div>
        <Login cookies={cookies} setCookie={setCookie} setUser={setUser} />
        <Register cookies={cookies} setCookie={setCookie} setUser={setUser} />
      </div>
      }
      <ReceiptList  cookies={cookies} receipts={receipts} setReceipts={setReceipts}/>
    </div>
  )
}