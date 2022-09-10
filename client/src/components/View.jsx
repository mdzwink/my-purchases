import React, { useState } from 'react';
import ReceiptList from './ReceiptList';
import Add from './Add';
import Signin from './Signin';

export default function View() {
  const [receipts, setReceipts] = useState([]);


  return (
    <div className='view'>
      <Signin />
      <Add setReceipts={setReceipts}/>
      <ReceiptList  receipts={receipts} setReceipts={setReceipts}/>
    </div>
  )
}