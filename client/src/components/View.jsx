import React, { useState } from 'react';
import ReceiptList from './ReceiptList';
import Add from './Add';
import Login from './Login';

export default function View() {
  const [receipts, setReceipts] = useState([]);


  return (
    <div className='view'>
      <Login />
      <Add setReceipts={setReceipts}/>
      <ReceiptList  receipts={receipts} setReceipts={setReceipts}/>
    </div>
  )
}