import React, { useState, useEffect } from 'react';
import Welcome from './Welcome';
import ReceiptList from './ReceiptList';
import Add from './AddForm';
import { Searchbar } from './Searchbar';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredReceipts, setReceiptState } from '../features/receipts/receiptSlice';

export default function Dashboard(props) {
  // extract props for ease of refference
  const { user, addFormActive, setAddingReceipt, cookies } = props
  const userReceipts = useSelector(state => state.receipt.userReceipts);
  const filteredReceipts = useSelector(state => state.receipt.filteredReceipts);
  const dispatch = useDispatch();
  //define filter boolian
  //define additional receipt state that can be affected by filter

  //filter button activates
  //active filter vs multiple states pre-filtered and ready to display

  const [searchQuery, setSearchQuery] = useState(''); 

  const handleSearchButton = (e) => {
    e.preventDefault();
    setSearchQuery('');
  }
  
  // Live search current receipt state
  let searchResults = [];
  const searchFor = () => {
    if(userReceipts) {
    searchResults = [];
    const receiptsCopy = [...userReceipts]
    receiptsCopy.map(receipt => (
      receipt.store.toLowerCase().includes(searchQuery)? searchResults.push(receipt) : receipt.date.includes(searchQuery)? searchResults.push(receipt) : false
    ))
    if (searchResults !== []) {
      dispatch(setFilteredReceipts(searchResults));
    }}
    return false
  }


  useEffect(() => {
    searchFor();
  }, [searchQuery])


  let email = '';
  if (user.email) {
    email = user.email;
  }
  const showAddForm = () => {
    addFormActive? setAddingReceipt(false) : setAddingReceipt(true);
  }
  //return array of only the receipts that meet filter conditions
  const handleFilter = (filter) => {
    const filteredReceipts = userReceipts.map(receipt => {
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
    
    console.log('filteredReceipts', filteredReceipts)
    return dispatch(setFilteredReceipts(filteredReceipts.filter(receipt => receipt !== false))); 
  }
  
  return (
    <>
      <Welcome />
      {/* {user.email? */}
      <div className='view'>
        <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearchButton={handleSearchButton} />
        <button onClick={() => handleFilter('all')} >all</button>
        <button onClick={() => handleFilter('archive')} >archive</button>
        <button onClick={() => handleFilter('current')} >current</button>
        {addFormActive?
          <div className='add-form' >
            <div className='button' onClick={() => showAddForm()}>Hide form</div>
            <Add user={user} cookies={cookies} />
          </div>
        :
          <div className='view'>
            <div className='lrg-button' onClick={() => showAddForm()}>New Receipt</div>
          </div>
        }
        {searchQuery?
          <section>
            <div>Searching for {searchQuery}</div>
            <ReceiptList  user={user} searchQuery={searchQuery} filteredReceipts={filteredReceipts} />
          </section>
        :
        <ReceiptList  user={user} searchQuery={searchQuery} filteredReceipts={filteredReceipts} />
        }
      </div>
    </>
  )
}