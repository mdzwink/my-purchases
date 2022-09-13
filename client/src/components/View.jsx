import React, { useState } from 'react';
import ReceiptList from './ReceiptList';
import Add from './Add';
import Login from './Login';

export default function View(props) {
  const { cookies, setCookie, removeCookie } = props
  const [receipts, setReceipts] = useState([]);

  return (
    <div className='view'>
      <Login setCookie={setCookie} />
      <Add cookies={cookies} setReceipts={setReceipts}/>
      <ReceiptList  cookies={cookies} receipts={receipts} setReceipts={setReceipts}/>
    </div>
  )
}