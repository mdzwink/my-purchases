import React, { className, useState } from "react";
import Button from './Button';
import './Add.css';
import axios from 'axios';

export default function Add(props) {
  const { setReceipts } = props;
  const [user_id, setUser_id] = useState('');
  const [img, setImg] = useState('');
  const [store, setStore] = useState('');
  const [date, setPurchase_date] = useState('');
  const [return_by, setReturn_by] = useState('');
  const [total, setTotal] = useState('');

  const handleForm = (e) => {
    e.preventDefault();
    // console.log('Button click!')

    const newReceipt = {
      user_id,
      img,
      store,
      date,
      return_by,
      total
    }

    const updateReceipts = (appendReceipt) => {
      setReceipts(prev => [...prev, appendReceipt])
    }
    const clearForm = () => {
      
    }

    axios.post('/receipts', newReceipt)
         .then((res) => {
           updateReceipts(res.data[0])
         })
         .then(() => {
           clearForm();
         })
         .catch(err => {
          console.log("ERR from post'/receipt'", err)
         })

  }


  return (
    <>
      <form>
        <label>Add Receipt:</label>
        <input 
          type="text" 
          placeholder="user_id"
          onChange={e => setUser_id(e.target.value)}></input>
        <input 
          type="text" 
          placeholder="receipt image"
          onChange={e => setImg(e.target.value)}></input>
        <input 
          type="text" 
          placeholder="store"
          onChange={e => setStore(e.target.value)}></input>
        <input 
          type="date" 
          placeholder="purchase date"
          onChange={e => setPurchase_date(e.target.value)}></input>
        <input 
          type="date" 
          placeholder="return by"
          onChange={e => setReturn_by(e.target.value)}></input>
        <input 
          type="text" 
          placeholder="recipt total $"
          onChange={e => setTotal(e.target.value)}></input>
      </form>
      <button onClick={handleForm}>Custom Button</button>
    </>
  );
}