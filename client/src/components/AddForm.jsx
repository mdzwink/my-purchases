import React, { useState } from "react";
import './AddForm.css';
import { setDefaultReminders } from "./helpers";
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
      setReceipts(prev => [...prev, appendReceipt])// prevReceipts or just prev??
    }
    const clearForm = () => {
      setImg('');
      setStore('');
      setPurchase_date('');
      setReturn_by('');
      setTotal('');
    }
    axios.post('/receipts', newReceipt)
    .then(res => {
      const receipt_id = res.data[0].id;
      const return_by = res.data[0].return_by;
      updateReceipts(res.data[0]);
      setDefaultReminders(receipt_id, return_by);
    })
    .then(res => {
      return clearForm();
    })
    .catch(err => {
      console.log("ERR from post'/receipt'", err)
    })
  }

  return (
    <>
      <form className="add-form" >
        <label className="form-label" >Add Receipt</label>
        <label>receipt image</label>
        <input 
          type="text"
          onChange={e => setImg(e.target.value)}
          value={img}
          className="add-input"
        ></input>
        <label>store</label>
        <input 
          type="text" 
          onChange={e => setStore(e.target.value)}
          value={store}
          className="add-input"
        ></input>
        <label>purchase date</label>
        <input 
          type="date" 
          onChange={e => setPurchase_date(e.target.value)}
          value={date}
          className="add-input"
        ></input>
        <label>return period ends</label>
        <input 
          type="date" 
          onChange={e => setReturn_by(e.target.value)}
          value={return_by}
          className="add-input"
        ></input>
        <label>receipt total</label>
        <input 
          type="number"
          min="0"
          step="any"
          onChange={e => setTotal(e.target.value)}
          value={total}
          className="add-input"
        ></input>
        {formError && <div className="form-error">{formError}</div>}
        <section className="buttons">
          <button className="confirm" onClick={(e) => handleForm(e)}>Add receipt</button>
          <button className="discard" onClick={(e) => handleForm(e)}>Discard</button>
        </section>
      </form>
    </>
  );
}