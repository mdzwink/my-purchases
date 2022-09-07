import React, { useState } from 'react';
import ReceiptList from './ReceiptList';
import Add from './Add';

export default function View() {
  const [receipts, setReceipts] = useState([]);


  return (
    <div className='view'>
      <Add setReceipts={setReceipts}/>
      <ReceiptList  receipts={receipts} setReceipts={setReceipts}/>
    </div>
  )
}