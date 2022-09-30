import React, { useState, useEffect } from 'react';
import ReceiptList from './ReceiptList';
import Add from './AddForm';
import Login from './Login';
import Register from './Register';
import { Searchbar } from './Searchbar';

export default function View(props) {
  // extract props for ease of refference
  const { user, addingReceipt, setAddingReceipt, cookies, setCookie, setUser } = props;

  // set state for:
   // all of the users assosiated receipts
   // receipts with a future return_by date
   // receipts with a past return_by date ...
   // can i assossiate buttons with a function that filters receipts and setReceipts instead of managing three seperate states?  Lets try...
   
  const [receipts, setReceipts] = useState([]);
  const [allReceipts, setAllReceipts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearchButton = (e) => {
    e.preventDefault();
    console.log(`Searching for ${searchQuery}`)
    setSearchQuery('');
  }
  
  // Live search current receipt state
  let searchResults = [];
  const searchFor = () => {
    if(receipts) {
    searchResults = [];
    const receiptsCopy = [...receipts]
    receiptsCopy.map(receipt => (
      receipt.store.toLowerCase().includes(searchQuery)? searchResults.push(receipt) : receipt.date.includes(searchQuery)? searchResults.push(receipt) : false
    ))
    if (searchResults !== []) {
      setReceipts(searchResults);
    }}
    return false
  }

  // always filter out receipts with past return_by
  // button and function to show just "archive"
  // button and function to show all receipts

  // receipts state holds all the users receipts -->


  useEffect(() => {
    searchResults = [];
    searchFor();
  }, [searchQuery])

  useEffect(() => {
    setAllReceipts([...receipts])
  }, [])

  let email = '';
  if (user.email) {
    email = user.email;
  }
  const showAddForm = () => {
    addingReceipt? setAddingReceipt(false) : setAddingReceipt(true);
    console.log('allReceipts',allReceipts)
  }
  const handleFilter = (filter) => {
    const filteredReceipts = allReceipts.map(receipt => {
      if(filter === "all") {
        return receipt;
      }
      if(filter === "archive" && Number(new Date(receipt.return_by)) < Number(new Date())) {
        return receipt;
      }
      if(filter === "current" && Number(new Date(receipt.return_by)) > Number(new Date())) {
        return receipt;
      }
      return false;
    })
    // return console.log('filteredReceipts', filteredReceipts.filter(receipt => receipt !== false))
    
    //return array of only the receipts that meet filter conditions
    return setReceipts(filteredReceipts.filter(receipt => receipt !== false)); 
  }

  return (
    <>
      {user.email?
      <div className='view'>
        <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearchButton={handleSearchButton} />
        <button onClick={() => handleFilter('all')} >all</button>
        <button onClick={() => handleFilter('archive')} >archive</button>
        <button onClick={() => handleFilter('current')} >current</button>
        {addingReceipt?
          <div className='add-form' >
            <div className='button' onClick={() => showAddForm()}>Hide form</div>
            <Add user={user} cookies={cookies} setReceipts={setReceipts}/>
          </div>
        :
          <div className='view'>
            <div className='lrg-button' onClick={() => showAddForm()}>New Receipt</div>
          </div>
        }
        {searchQuery?
          <section>
            <div>Searching for {searchQuery}</div>
            <ReceiptList  user={user} cookies={cookies} receipts={receipts} setReceipts={setReceipts} />
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