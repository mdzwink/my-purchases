import React, { useState } from "react";
import './AddReceiptForm.css';
import axios from 'axios';
import BackgroundFade from "./BackgroundFade";

export default function AddReceiptForm(props) {
  const { user, addFormToggle, getReceipts } = props;
  const user_id = user.id;
  // form values
  const [img, setImg] = useState('');
  const [store, setStore] = useState('');
  const [date, setPurchase_date] = useState('');
  const [return_by, setReturn_by] = useState('');
  const [total, setTotal] = useState('');

  const [formError, setFormError] = useState('');

  const baseFieldError = 'Error, please include';

  const handleCancel = (e) => {
    e.preventDefault();
    addFormToggle();
  }

  //replaces receipt info and engages box-shadow
  const handleSubmit = (e) => {
    e.preventDefault();
    //resetting formError
    setFormError('');
    //setting form error if not all fields are filled upon submission
    if (!img) {
      return setFormError(baseFieldError + ' image url.');      
    }
    if (!store) {
      return setFormError(baseFieldError + ' store name.');      
    }
    if (!date) {
      return setFormError(baseFieldError + ' date of purchase.');      
    }
    if (!return_by) {
      return setFormError(baseFieldError + ' return expiry date.');      
    }
    if (!total) {
      return setFormError(baseFieldError + ' receipt total.');      
    }
    
    const clearForm = () => {
      setImg('');
      setStore('');
      setPurchase_date('');
      setReturn_by('');
      setTotal('');
    }

    // close form
    addFormToggle();

    // object with current form values ready for submit(state can be found above)
    const newReceipt = {
      user_id,
      img,
      store,
      date,
      return_by,
      total
    }
    axios.post('/receipts', newReceipt)
    .then(res => {
      const receipts = res.data[0]
      if (receipts) {
        getReceipts();
      }
    })
    .then(() => {
      return clearForm();
    })
    .catch(err => {
      console.log("ERR from post'/receipt'", err)
    })
  }

  return (
    <>
      <BackgroundFade componentToggle={addFormToggle} transparent={false} />
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
          <button className="confirm" onClick={e => handleSubmit(e)}>Add receipt</button>
          <button className="discard" onClick={e => handleCancel(e)}>Discard</button>
        </section>
      </form>
    </>
  );
}