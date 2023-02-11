import React, { useState } from "react";
import '../AddForm.css';
import '../ReceiptItem.css';
import axios from 'axios';

export default function AddReminders(props) {
  const { newReminderArr, setNewReminderArr } = props;
  const { user, setReceipts } = props;
  const user_id = user.id;
  const [img, setImg] = useState('');
  const [store, setStore] = useState('');
  const [date, setPurchase_date] = useState('');
  const [return_by, setReturn_by] = useState('');
  const [total, setTotal] = useState('');
  const [formError, setFormError] = useState('')


  // >>>>

  //props:
  //reminders (so i can remove)
  //

  //here:
  //newReminderArr
  //

  const handleReminderSubmit = (e, receipt_id, newReminder) => {
    e.preventDefault();
    const date = newReminder
    const reminder = {
      receipt_id,
      date
    }
    axios.post('/reminders', reminder)
    .then(d => {
      return console.log('reminder set:', d);
    })
    .catch(err => {
      console.log('ERROR from setReminder', err);
    });
  }

  // <<<<


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

    const clearForm = () => {
      setImg('');
      setStore('');
      setPurchase_date('');
      setReturn_by('');
      setTotal('');
    }
    
  }

  return (
    <>
      <form>
        <div>
          <label htmlFor="new-image">New reminder</label>
          <input
            type="date"
            id="new-reminder"
            onChange={e => {setNewReminderArr(e.target.value);}}
            className="add-input"
            />
        </div>
        <div className="new-reminder-preview">
          <div className="reminder-chip">{newReminderArr}</div>
        </div>
        <button onClick={(e)=> handleReminderSubmit(e, id, newReminderArr)}>Add reminder</button>
      </form>
    </>
  );
}