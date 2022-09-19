import React, { useState } from "react";
import './Add.css';
import axios from 'axios';

export default function Add(props) {
  const { user, setReceipts } = props;
  const user_id = user.id;
  const [img, setImg] = useState('');
  const [store, setStore] = useState('');
  const [date, setPurchase_date] = useState('');
  const [return_by, setReturn_by] = useState('');
  const [total, setTotal] = useState('');
  const [formError, setFormError] = useState('')

  // to make into receiptForm
    // two queries
    // different handle"Button" functions


    //want form to show conditionally upon boolean state value set by edit button
    //replaces receipt info and engages box-shadow
  const handleForm = (e) => {
    e.preventDefault();
    //resetting formError
    setFormError('');
    //setting form error if not all fields are filled upon submission
    if (!img) {
      return setFormError('Error, please include image url.');      
    }
    if (!store) {
      return setFormError('Error, please include store name.');      
    }
    if (!date) {
      return setFormError('Error, please include date of purchase.');      
    }
    if (!return_by) {
      return setFormError('Error, please include return expiry date.');      
    }
    if (!total) {
      return setFormError('Error, please include receipt total.');      
    }
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
      setImg('');
      setStore('');
      setPurchase_date('');
      setReturn_by('');
      setTotal('');
    }

    axios.post('/receipts', newReceipt)
    .then((res) => {
      updateReceipts(res.data[0])
      return clearForm();
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
          placeholder="receipt image"
          onChange={e => setImg(e.target.value)}
          value={img}
          ></input>
        <input 
          type="text" 
          placeholder="store"
          onChange={e => setStore(e.target.value)}
          value={store}
          ></input>
        <input 
          type="date" 
          placeholder="purchase date"
          onChange={e => setPurchase_date(e.target.value)}
          value={date}
          ></input>
        <input 
          type="date" 
          placeholder="return by"
          onChange={e => setReturn_by(e.target.value)}
          value={return_by}
          ></input>
        <input 
          type="text" 
          placeholder="recipt total $"
          onChange={e => setTotal(e.target.value)}
          value={total}
          ></input>
      </form>
      {formError && <div className="form-error">{formError}</div>}
      <button onClick={handleForm}>Add receipt</button>
    </>
  );
}