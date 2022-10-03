import axios from "axios";


export function getReceipts(user, setReceipts) {
  axios.get('/receipts', {
    params: user.id
  })
  .then(d => {
    return setReceipts(d.data);
  })
  .catch(err => {
    console.log("ERROR FROM getReceipts()", err);
  });
}


// Subtracts 'sub' days from date('day') given and returns date in mm-dd-yyyy format. Zero(0) 'sub' returns inputted date and negative 'sub' gives date ahead of given 'day'
export function getDateBefore(day, sub) {
  console.log('TRACKING getDateBefor> > >:', day)
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

// sets reminder 'sub' days before 'return_by' date. Sets alert(reminder mssg) code to 'code'
export function setReminder(receipt_id, return_by, sub, alert_code) {

  const date = getDateBefore(return_by, sub)
  const reminder = {
    receipt_id,
    date,
    alert_code
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
  axios.post('/reminders/delete', reminder_id)
  .then(d => {
    return console.log('d from deleteReminder', d)
  })
  .catch(err => {
    console.log('ERROR from deleteReminder():', err);
  })
}

export function triggerAlerts(receipt_id, reminders, store) {
  const thisDay = new Date()
  if (reminders) {
    reminders.forEach(reminder => {
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
        switch(reminder.alert_code) {
          case 0:
            alert(`You have less than 24 hours to return items from your ${store} purchase.`);
            break;
          case 1:
            alert(`There are three(3) days to return items from your ${store} purchase.`);
            break;
          case 3:
            alert(`There is one week to return items from your ${store} purchase.`);
            break;
          default:
            alert(`The return period for your purchase from ${store} is coming up.`);
        }
      }
    })
  }
}

export function checkForReminders(receipt_id, store, cb) {
  // const receipt_id = id;
  axios.get('/reminders', {
    params: receipt_id
  })
  .then(d => {
    let reminders = d.data;
    return cb(reminders);
  })
  .catch(err => {
    console.log('ERROR from checkReminders:', err);
  })
}