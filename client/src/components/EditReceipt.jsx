import React, { useState } from "react";
import './AddReceiptForm.css';
import axios from 'axios';
import BackgroundFade from "./BackgroundFade";

export default function EditReceipt(props) {
  const { user, id, img, store, date, return_by, total, setEditReceiptMode, getReceipts, purchaseDate } = props;
  const user_id = user.id;

  const [updatedImg, setImage] = useState(img || 'http://source.unsplash.com/400x400?sunrise');
  const [updatedStore, setStore] = useState(store);
  const [updatedPurchaseDate, setUpdatedPurchaseDate] = useState(date.slice(0,10)); // is there any issue here?
  const [updatedReturnByDate, setUpdatedReturnByDate] = useState(return_by.slice(0,10)); // is there any issue here?
  const [updatedTotal, setTotal] = useState(total);
  const [formError, setFormError] = useState('')
  
  const handleCancel = (e) => {
    e.preventDefault();
    setEditReceiptMode(false)
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    //resetting formError
    setFormError('');
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
      setEditReceiptMode(false);
      return getReceipts();
    })
    .catch(err => {
      console.log("ERR from post'/receipt'", err)
      return setFormError('Error, something went wrong.'); 
    })
  }

  return (
    <>
      <BackgroundFade componentToggle={setEditReceiptMode} transparent={false}/>
      <form className="edit-form" >
        <label className="form-label" >Store: <span>{store}</span><br/>Date: <span>{purchaseDate}</span></label>
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
          onChange={e => setUpdatedPurchaseDate(e.target.value)}
          value={updatedPurchaseDate}
          ></input>
        <label>return period ends</label>
        <input
          type="date"
          onChange={e => setUpdatedReturnByDate(e.target.value)}
          value={updatedReturnByDate}
          ></input>
        <label>receipt total</label>
        <input
          type="text"
          onChange={e => setTotal(e.target.value)}
          value={updatedTotal}
          ></input>
        {formError && <div className="form-error">{formError}</div>}
        <section className="buttons">
          <button className="confirm" onClick={(e) => handleUpdate(e)} >Save changes</button>
          <button className="discard" onClick={(e) => handleCancel(e)} >Discard Changes</button>
        </section>
      </form>
    </>
  );
}