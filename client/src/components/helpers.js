import axios from "axios";


export function getReceipts(user, setReceipts, setAllReceipts) {
  axios.get('/receipts', {
    params: user.id
  })
  .then(d => {
    setReceipts(d.data);
    return d;
  })
  .then(d => {
    return setAllReceipts(d.data);
  })
  .catch(err => {
    console.log("ERROR FROM getReceipts()", err);
  });
}


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

// sets reminder 'sub' days before 'return_by' date.
export function setReminder(receipt_id, reminder_date) {

  // const date = getDateBefore(return_by, sub)
  const reminder = {
    receipt_id,
    reminder_date
  }

  axios.post('/reminders', reminder)
  .then(d => {
    return console.log('SET-REMINDER:', d);
  })
  .catch(err => {
    console.log('ERROR from setReminder', err);
  });
}

export function setDefaultReminders(receipt_id, return_by) {
  console.log('return_by/helpers/setDef-2:', return_by)

  setReminder(receipt_id, return_by, 0, 1);
  setReminder(receipt_id, return_by, 3, 1);
  setReminder(receipt_id, return_by, 7, 1);
  return console.log('Default reminders set')
}

export function deleteReminder(reminder_id) {
  axios.post('/reminders/delete', {'reminder_id': reminder_id})
  .then(d => {
    return console.log('success from deleteReminder', d)
  })
  .catch(err => {
    console.log('ERROR from deleteReminder():', err);
  })
}

export function triggerAlerts(reminders, store) {
  const thisDay = new Date()
  if (reminders) {
    reminders.forEach(reminder => {
      console.log('received reminder dates',reminder)
      const reminderDate = new Date(reminder.date);
      const compareDay1 = reminderDate.getDate();
      const compareMonth1 = reminderDate.getMonth() + 1;
      const compareYear1 = reminderDate.getFullYear();
      const compareDay2 = thisDay.getDate();
      const compareMonth2 = thisDay.getMonth() + 1;
      const compareYear2 = thisDay.getFullYear();

      
      const reminderDay = `${compareDay1}-${compareMonth1}-${compareYear1}`;
      const today = `${compareDay2}-${compareMonth2}-${compareYear2}`;
      if (reminderDay === today) {
        alert('ha!')
      }
    })
  }
}

export async function getReminders(receipt_id, setReminders) {
  // const receipt_id = id;
  return axios.get('/reminders', {
    params: receipt_id
  })
  .then(d => {
    let reminders = d.data;
    return reminders;
  })
  .catch(err => {
    console.log('ERROR from checkReminders:', err);
  })
}