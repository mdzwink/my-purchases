import React, { useState } from 'react';
import ReceiptList from './ReceiptList';
import Add from './Add';
import Login from './Login';
import Register from './Register';

export default function View(props) {
  const { user, addingReceipt, setAddingReceipt, cookies, setCookie, setUser } = props
  const [receipts, setReceipts] = useState([]);
  let email = '';
  if (user.email) {
    email = user.email;
  }
  const setAddForm = () => {
    addingReceipt? setAddingReceipt(false) : setAddingReceipt(true);
  }
  return (
    <>
      {user.email?
      <div className='view'>
        {addingReceipt?
          <div className='add-form' >
            <div className='button' onClick={() => setAddForm()}>Hide form</div>
            <Add user={user} cookies={cookies} setReceipts={setReceipts}/>
          </div>
        :
          <div className='view'>
            <div className='lrg-button' onClick={() => setAddForm()}>New Receipt</div>
          </div>
        }
        <ReceiptList  user={user} cookies={cookies} receipts={receipts} setReceipts={setReceipts}/>
      </div>
      :
      <div className='logged-out-view'>
        <div>
        <Login cookies={cookies} setCookie={setCookie} setUser={setUser} />
        </div>
        <div>
        <Register cookies={cookies} setCookie={setCookie} setUser={setUser} />
        </div>
      </div>
      }
    </>
  )
}