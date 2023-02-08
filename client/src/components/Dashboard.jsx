import React, { useState, useEffect } from 'react';
import ReceiptList from './ReceiptList';
import Add from './AddForm';

export default function Home(props) {
  // extract props for ease of refference
  const { darkMode, user, cookies, setCookie, setUser, handleLogout, receipts, setReceipts } = props;

  // const [receipts, setReceipts] = useState([]);
  const [allReceipts, setAllReceipts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 

  const handleSearchButton = (e) => {
    e.preventDefault();
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
    searchFor();
  }, [searchQuery])


  let email = '';
  if (user.email) {
    email = user.email;
  }

  //return array of only the receipts that meet filter conditions
  const handleFilter = (filter) => {
    const filteredReceipts = allReceipts.map(receipt => {
      const today = Number(new Date());
      const return_byMS = Number(new Date(receipt.return_by));
      if(filter === "all") {
        return receipt;
      }
      if(filter === "archive" && return_byMS < today) {
        return receipt;
      }
      if(filter === "current" && return_byMS > today) {
        return receipt;
      }
      return false;
    })
    return setReceipts(filteredReceipts.filter(receipt => receipt !== false)); 
  }
  
  return (
    <main>
      {/* {user.email? */}
      <div className={darkMode ? 'view dm' : 'view'}>
        {/* <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearchButton={handleSearchButton} /> */}
        {searchQuery?
          <section>
            <div>Searching for {searchQuery}</div>
            <ReceiptList  user={user} cookies={cookies} receipts={receipts} setReceipts={setReceipts} />
          </section>
        :
        <ReceiptList  user={user} receipts={receipts} setReceipts={setReceipts} setAllReceipts={setAllReceipts}/>
        }
      </div>
    </main>
  )
}