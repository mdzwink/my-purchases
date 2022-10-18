import React, { useState } from "react";
import './AddForm.css';
import { setDefaultReminders } from "./helpers";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addReceipt } from "../features/receipts/receiptSlice";

export default function Add(props) {
  const { user, setReceipts } = props;
  const user_id = user.id;
  const [img, setImg] = useState('');
  const [store, setStore] = useState('');
  const [date, setPurchase_date] = useState('');
  const [return_by, setReturn_by] = useState('');
  const [total, setTotal] = useState('');
  const [formError, setFormError] = useState('')

  const dispatch = useDispatch();


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
      // dispatch(addReceipt(newReceipt))
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
      const receipt_id = res.data[0].id;
      const return_by = res.data[0].return_by;
      updateReceipts(res.data[0]);
      console.log('return_by/Add.js-1:', return_by)
      // setDefaultReminders(receipt_id, return_by);
      return clearForm();
    })
    .catch(err => {
      console.log("ERR from post'/receipt'", err)
    })
  }

  return (
    <>
      <form className="add-form" >
        <label className="form-label" >Add Receipt:</label>
        <input 
          type="text" 
          placeholder="receipt image"
          onChange={e => setImg(e.target.value)}
          value={img}
          className="add-input"
        ></input>
        <label>Store:</label>
        <input 
          type="text" 
          placeholder="store"
          onChange={e => setStore(e.target.value)}
          value={store}
          className="add-input"
        ></input>
        <label>Purchase date:</label>
        <input 
          type="date" 
          placeholder="purchase date"
          onChange={e => setPurchase_date(e.target.value)}
          value={date}
          className="add-input"
        ></input>
        <label>Return period ends</label>
        <input 
          type="date" 
          placeholder="return by"
          onChange={e => setReturn_by(e.target.value)}
          value={return_by}
          className="add-input"
        ></input>
        <label>Total $</label>
        <input 
          type="text" 
          placeholder="recipt total $"
          onChange={e => setTotal(e.target.value)}
          value={total}
          className="add-input"
        ></input>
        {formError && <div className="form-error">{formError}</div>}
        <button className="add-form-button" onClick={handleForm}>Add receipt</button>
      </form>
    </>
  );
}