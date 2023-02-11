import React, { useState } from "react";
import './AddForm.css';
import "./ReceiptItem.css";
import { setDefaultReminders } from "./helpers";
import axios from 'axios';

export default function UploadImages(props) {
  const { user, setReceipts } = props;
  const user_id = user.id;
  const [img, setImg] = useState('');
  const [store, setStore] = useState('');



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

    const newReceipt = {
      user_id,
      img,
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
    </>
  );
}