import React, { useState } from "react";
import './AddForm.css';
import axios from 'axios';
import { getReceipts } from "./helpers";

export default function EditReceipt(props) {
  const { user, currentInfo, setReceipts, setEditMode } = props;
  const user_id = user.id;
  const { id, img, store, date, total, return_by } = currentInfo

  const [updatedImg, setImage] = useState(img || 'http://source.unsplash.com/400x400?sunrise');
  const [updatedStore, setStore] = useState(store);
  const [updatedDate, setPurchase_date] = useState(date);
  const [updatedReturn_by, setReturn_by] = useState(return_by);
  const [updatedTotal, setTotal] = useState(total);
  const [formError, setFormError] = useState('')
  
  
  const handleCancel = () => {
    setEditMode(false)
  }

  const handleUpdate = () => {
    //resetting formError
    setFormError('');
    setEditMode(false);
    //setting form error if not all fields are filled upon submission
    if (!id) {
      axios.status(500).send('sorry, something went wrong :( \n Please try agian later...')
      return setFormError('Error, please include image url.');      
    }
    if (!updatedStore) {
      return setFormError('Error, please include store name.');      
    }
    if (!updatedDate) {
      return setFormError('Error, please include date of purchase.');      
    }
    if (!updatedReturn_by) {
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
      updatedDate,
      updatedReturn_by,
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
          onChange={e => setPurchase_date(e.target.value)}
          value={updatedDate}
          ></input>
        <label>return period ends</label>
        <input
          type="date"
          onChange={e => setReturn_by(e.target.value)}
          value={updatedReturn_by}
          ></input>
        <label>receipt total</label>
        <input
          type="text"
          onChange={e => setTotal(e.target.value)}
          value={updatedTotal}
          ></input>
        {formError && <div className="form-error">{formError}</div>}
        <section className="buttons">
          <button className="confirm" onClick={() => handleUpdate()} >Save</button>
          <button className="discard" onClick={() => handleCancel()} >Discard</button>
        </section>
      </form>
    </>
  );
}