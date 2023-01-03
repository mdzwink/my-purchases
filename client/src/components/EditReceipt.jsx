import React, { useState } from "react";
import './AddForm.css';
import axios from 'axios';
import moment from 'moment';
import { getReceipts } from "./helpers";
import { useDispatch, useSelector } from "react-redux";
import { editStateReceipt } from "../features/receipts/receiptSlice";

export default function EditReceipt(props) {
  const dispatch = useDispatch();
  const receiptState = useSelector(state => state.receipt.userReceipts);
  const { user, currentInfo, setReceipts, setEditMode } = props;
  const user_id = user.id;
  const { id, img, store, date, total, return_by } = currentInfo
  const formattedDate = moment.utc(date.toLocaleString()).format("YYYY-MM-DD");
  const [updatedImg, setImage] = useState(img || 'http://source.unsplash.com/400x400?sunrise');
  const [updatedStore, setStore] = useState(store);
  console.log('date test:',formattedDate)
  const [updatedDate, setPurchase_date] = useState(formattedDate);
  const [updatedReturn_by, setReturn_by] = useState(return_by);
  const [updatedTotal, setTotal] = useState(total);
  const [formError, setFormError] = useState('')
  console.log('date test:',updatedDate)
  
  
  const handleCancel = () => {
    setEditMode(false)
  }

  const handleUpdate = (e) => {
    e.preventDefault()
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
      console.log('receipt updated')
      return dispatch(editStateReceipt(updatedReceipt))
    })
    .catch(err => {
      console.log("ERR from post'/receipt'", err)
    })
  }

  return (
    <>
      <form className="edit-form" >
        <label>Edit Receipt:</label>
        <input
          type="text" 
          placeholder="receipt image"
          onChange={e => setImage(e.target.value)}
          value={updatedImg}
          ></input>
        <input
          type="text" 
          placeholder="store"
          onChange={e => setStore(e.target.value)}
          value={updatedStore}
          ></input>
        <input
          type="date" 
          placeholder="purchase date"
          onChange={e => setPurchase_date(e.target.value)}
          value={updatedDate}
          ></input>
        <input
          type="date" 
          placeholder="return by"
          onChange={e => setReturn_by(e.target.value)}
          value={updatedReturn_by}
          ></input>
        <input
          type="text" 
          placeholder="recipt total $"
          onChange={e => setTotal(e.target.value)}
          value={updatedTotal}
          ></input>
        {formError && <div className="form-error">{formError}</div>}
        <button onClick={(e) => handleUpdate(e)} className="button">Save</button>
        <button onClick={() => handleCancel()} className="caution-button">Discard</button>
      </form>
    </>
  );
}