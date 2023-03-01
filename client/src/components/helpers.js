import axios from "axios";


// >>>>>>>>>>>>>>>>
// ReceiptList component helpers:
export function getReceipts(user, setReceipts) {
  axios.get('/receipts', { params: user.id })
  .then(d => {
    setReceipts(d.data);
    return d;
  })
  .catch(err => {
    console.log("ERROR FROM getReceipts()", err);
  });
}



// >>>>>>>>>>>>>>>>>>>>
// ReceiptItem, AddReminder component helpers:

export function setReminder(receipt_id, reminder_date, setReminders) {
  const date = reminder_date;
  const reminder = {
    receipt_id,
    date
  }
  axios.post('/reminders', reminder)
  .then(d => {
    console.log(d)
    // return setReminders(d)
  })
  .catch(err => {
    throw new Error(err)
  });
}
// used to get reminders from db via RESTful API call, then set reminderArr state with the returned receipt objects array;
export function getReminders(receipt_id, setReminders) {
  // const receipt_id = id;
  axios.get('/reminders', {
    params: receipt_id
  })
  .then(d => {
    if(!d) {
      return false;
    }
    setReminders(d.data);
  })
  .catch(err => {
    throw new Error(err);
  })
}
// delete reminder given reminder_id
export function deleteReminder(reminder_id) {
  axios.post('/reminders/delete', { reminder_id: reminder_id })
  .then(d => {
    getReminders()
    return console.log('success from deleteReminder', d)
  })
  .catch(err => {
    console.log('ERROR from deleteReminder():', err);
  })
}

//>>>>>>>>>>>>>>>>>>
// GENERAL:

// returns today's date in "yyyy-mm-dd" format. Primarily created for setting form "min" value.
const calcMinDate = () => {
  const today = new Date()
  const year = (today.getFullYear()).toString();
  let month = (today.getMonth() + 1).toString();
  let day = (today.getDate()).toString();
  if(month < 10) month = '0' + month;
  if(day < 10) day = '0' + day
  return `${year}-${month}-${day}`
}
export default calcMinDate;




// >>>>>>>>>>>>>>>>>>>>>>>>>>>
// MANUAL TESTING USE:

// currently triggers alert if any date in reminders array match todays date.
export function triggerAlerts(reminders, store) {
  const thisDay = new Date()
  if (reminders) {
    reminders.forEach(reminder => {
      console.log('received reminder dates',reminder)
      const reminderDate = new Date(reminder.date);
      const Day1 = reminderDate.getDate();
      const Month1 = reminderDate.getMonth() + 1;
      const Year1 = reminderDate.getFullYear();
      const Day2 = thisDay.getDate();
      const Month2 = thisDay.getMonth() + 1;
      const Year2 = thisDay.getFullYear();
      
      const reminderDay = `${Day1}-${Month1}-${Year1}`;
      const today = `${Day2}-${Month2}-${Year2}`;
      if (reminderDay === today) {
        alert('ha!')
      }
    })
  }
  return false;
}




// >>>>>>>>>>>>>>>>>>>>>>
// NOT IN USE:

// Subtracts 'sub' days from date('day') given and returns date in mm-dd-yyyy format. Zero(0) 'sub' returns inputted date and negative 'sub' gives date ahead of given 'day'
export function getDateBefore(day, sub) {
  const date = new Date(day);
  date.setDate(date.getDate() - sub);
  const d = date.getDate();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  const year = date.getFullYear();
  const reminder = `${month}-${d}-${year}`;
  return reminder;
}

export function setDefaultReminders(receipt_id, return_by) {
  console.log('return_by/helpers/setDef-2:', return_by)

  // setReminder(receipt_id, return_by, 0, 1);
  // setReminder(receipt_id, return_by, 3, 1);
  // setReminder(receipt_id, return_by, 7, 1);
  return console.log('Default reminders set')
}
