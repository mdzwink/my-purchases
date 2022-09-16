import React, { useState } from 'react';
import ReceiptList from './ReceiptList';
import Add from './Add';
import Login from './Login';
import Register from './Register';

export default function View(props) {
  const { cookies, setCookie } = props
  const [receipts, setReceipts] = useState([]);

  return (
    <div className='view'>
      <Login setCookie={setCookie} />
      <Register setCookie={setCookie} />
      <Add cookies={cookies} setReceipts={setReceipts}/>
      <ReceiptList  cookies={cookies} receipts={receipts} setReceipts={setReceipts}/>
    </div>
  )
}