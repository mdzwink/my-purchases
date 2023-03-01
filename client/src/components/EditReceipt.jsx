import React, { useState } from "react";
import './AddReceiptForm.css';
import axios from 'axios';
import { getReceipts } from "./helpers";

export default function EditReceipt(props) {
  const { user, currentInfo, setReceipts, setEditReceiptMode } = props;
  const user_id = user.id;
  const { id, img, store, date, total, return_by } = currentInfo

  const [updatedImg, setImage] = useState(img || 'http://source.unsplash.com/400x400?sunrise');
  const [updatedStore, setStore] = useState(store);
  const [updatedPurchaseDate, setPurchaseDate] = useState('');
  const [updatedReturnByDate, setReturnByDate] = useState('');
  const [updatedTotal, setTotal] = useState(total);
  const [formError, setFormError] = useState('')
  
  // for display of currently set dates or updated dates once user makes change;
  const receiptDate = updatedPurchaseDate || date.slice(0,10);
  const returnDate = updatedReturnByDate || return_by.slice(0,10);
  
  const handleCancel = (e) => {
    e.preventDefault();
    setEditReceiptMode(false)
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    //resetting formError
    setFormError('');
    setEditReceiptMode(false);
    //setting form error if not all fields are filled upon submission
    if (!id) {
      axios.status(500).send('sorry, something went wrong :( \n Please try agian later...')
      return setFormError('Error, please include image url.');      
    }
    if (!updatedStore) {
      return setFormError('Error, please include store name.');      
    }
    if (!updatedPurchaseDate) {
      return setFormError('Error, please include date of purchase.');      
    }
    if (!updatedReturnByDate) {
      return setFormError('Error, please include return expiry date.');      
    }
    if (!updatedTotal) {
      return setFormError('Error, please include receipt total.');      
    }
    const updatedReceipt = {
      id,
      user_id,
      updatedImg,
      updatedStore,
      updatedPurchaseDate,
      updatedReturnByDate,
      updatedTotal
    }
    
    axios.post('/receipts/update', updatedReceipt)
    .then(() => {
      return getReceipts(user, setReceipts)
    })
    .catch(err => {
      console.log("ERR from post'/receipt'", err)
    })
  }

  return (
    <>
      <form className="edit-form" >
        <label className="form-label" >Edit Receipt</label>
        <label>receipt image</label>
        <input
          type="text"
          onChange={e => setImage(e.target.value)}
          value={updatedImg}
          ></input>
        <label>store</label>
        <input
          type="text"
          onChange={e => setStore(e.target.value)}
          value={updatedStore}
          ></input>
        <label>purchase date</label>
        <input
          type="date"
          onChange={e => setPurchaseDate(e.target.value)}
          value={receiptDate}
          ></input>
        <label>return period ends</label>
        <input
          type="date"
          onChange={e => setReturnByDate(e.target.value)}
          value={returnDate}
          ></input>
        <label>receipt total</label>
        <input
          type="text"
          onChange={e => setTotal(e.target.value)}
          value={updatedTotal}
          ></input>
        {formError && <div className="form-error">{formError}</div>}
        <section className="buttons">
          <button className="confirm" onClick={(e) => handleUpdate(e)} >Save</button>
          <button className="discard" onClick={(e) => handleCancel(e)} >Discard</button>
        </section>
      </form>
    </>
  );
}