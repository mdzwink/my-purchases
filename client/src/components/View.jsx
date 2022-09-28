import React, { useState, useEffect } from 'react';
import ReceiptList from './ReceiptList';
import Add from './Add';
import Login from './Login';
import Register from './Register';
import { Searchbar } from './Searchbar';

export default function View(props) {
  const { user, addingReceipt, setAddingReceipt, cookies, setCookie, setUser } = props
  const [receipts, setReceipts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  // const [queryReceipts, setQueryReceipts] = useState('');

  const handleSearchButton = (e) => {
    e.preventDefault();
    console.log(`Searching for ${searchQuery}`)
    //setQueryReciepts with receipts that have .include('search_term') in either receipt.store, receipt.date(plus or minus a couple days), or receipt.return_by
    // setQueryReceipts(receiptsCopy.map((receipt) => {
    //   if (receipt.store.includes(searchQuery)) {
    //     setQueryReceipts([...queryReceipts, receipt])
    //   }
    // }))
  }
  
  const receiptsCopy = [...receipts]

  let searchResults = [];
  
  const searchFor = () => {
    receiptsCopy.map(receipt => (
      receipt.store.includes(searchQuery)? searchResults.push(receipt) : receipt.date.includes(searchQuery)? searchResults.push(receipt) : false
    ))
    console.log('searchResults:', searchResults)
    if (searchResults !== []) {
      setReceipts(searchResults);
    }
  }

  useEffect(() => {
    console.log(searchQuery)
    searchResults = [];
    searchFor();
  }, [searchQuery])

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
        <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearchButton={handleSearchButton} />
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
        {searchQuery?
          <section>
            <div>Searching for {searchQuery}</div>
            <ReceiptList  user={user} cookies={cookies} receipts={receipts} setReceipts={setReceipts}/>
          </section>
        :
        <ReceiptList  user={user} cookies={cookies} receipts={receipts} setReceipts={setReceipts}/>
        }
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