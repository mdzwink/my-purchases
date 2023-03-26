import React, { useState } from "react";
import '../ReceiptItem.css';
import axios from 'axios';
import { todayAsYyyymmdd } from "../helpers";

export default function AddReminders(props) {
  const { receipt_id, setEditReminderMode, newReminder, setNewReminder, setReminders } = props;
  const [errorMsg, setErrorMsg] = useState('');
  const [newReminderDate, setNewReminderDate] = useState('');


  // updates db and reminderArr (to avoid complete rerender with with) with a new date
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newReminder) return setErrorMsg('Please enter a date!')
    setEditReminderMode(false)
    setNewReminder('')
    const date = newReminder
    const reminder = {
      receipt_id,
      date
    };
    axios.post('/reminders', reminder)
    .then(d => {
      setReminders(d.data.date)
    })
    .catch(err => {
      console.log('ERROR from setReminder', err);
    });
  }

  return (
    <>
      <form>
        <div>
          <label>New reminder</label>
          <input
            type="date"
            id="new-reminder"
            min={todayAsYyyymmdd()}
            onChange={e => {setNewReminderDate(e.target.value);}}
            className="add-input"
            required
            />
        { errorMsg && <p>{errorMsg}</p> }
        </div>
        <div className="new-reminder-preview">
          <div className="reminder-chip">
            {newReminderDate}
          </div>
        </div>
        <button onClick={(e)=> handleFormSubmit(e)}>Add reminder</button>
      </form>
    </>
  );
}