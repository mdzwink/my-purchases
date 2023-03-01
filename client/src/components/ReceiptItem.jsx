import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "./ReceiptList.css";
import EditReceipt from "./EditReceipt.jsx";
import calcMinDate, { getReceipts, getReminders, setReminder, triggerAlerts } from "./helpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars, faX, faClose } from '@fortawesome/free-solid-svg-icons';
import ReminderChip from "./ReminderChip";
import Lightbox from "./Lightbox";



export default function ReceiptItem(props) {
  const { user, receipts, setReceipts, id, img, store, date, total, return_by } = props;
  const currentInfo = {
    id,
    img,
    store,
    date,
    total,
    return_by
  };

  // state for conditionally rendered components/elements
  const [editReceiptMode, setEditReceiptMode] = useState(false);
  const [editReminderMode, setEditReminderMode] = useState(false);
  const [addImageMode, setAddImageMode] = useState(false);
  const [itemMenuMode, setItemMenuMode] = useState(false);
  const [lightboxMode, setLightboxMode] = useState(false);
  const [confirmDeleteMode, setConfirmDeleteMode] = useState(false);
  // state for interactive (hover, focus, etc) rendering or switching
  const [infoSwitch, setInfoSwitch] = useState(false);
  const [subtextClasses, setSubtextClasses] = useState(false);
  // state for forms
  const [newImgName, setNewImgName] = useState('');
  const [newImgArr, setNewImgArr] = useState([]);
  const [newReminderDate, setNewReminderDate] = useState('');
  const [minDate, setMinDate] = useState('');
  const [newReminder, setNewReminder] = useState('');
  // state for array of items for render
  const [reminders, setReminders] = useState([]);
  
  const purchaseDate = moment.utc(date.toLocaleString()).format("ddd, MMMM Do");
  const returnBy = moment.utc(return_by.toLocaleString()).format("ddd, MMM Do");
  const daysLeft = moment(return_by).subtract(new Date()).format('DD'); 
  const totalCost = total;

  const handleReminderClick = (e) => {
    e.preventDefault();
    setEditReminderMode(true)
  }

  const handleEditClick = (e) => {
    e.preventDefault();
    setEditReceiptMode(true)
  }
  
  const handleDeleteClick = (e) => {
    e.preventDefault();
    setConfirmDeleteMode(true);
  }
  const deleteReceipt = (receipt_id) => {
    axios.post('/receipts/delete', { receipt_id: receipt_id } )
    .then(() => {
      return getReceipts(user, setReceipts);
    })
    .catch(err => { 
      console.log('ERROR from deleteReceipt():', err);
    })
  }

  
  const handleAddReminderClick = (command) => {
    if(command === 'close') {
      setNewReminderDate('');
    }
    editReminderMode ? setEditReminderMode(false) : setEditReminderMode(true);
  }
  
  // updates db and reminderArr (to avoid complete rerender with with) with a new date
  const handleReminderSubmit = (e, receipt_id) => {
    e.preventDefault();
    setEditReminderMode(false)
    const date = newReminder
    const reminder = {
      receipt_id,
      date
    };
    axios.post('/reminders', reminder)
    .then(d => {
      setReminder(d.data.date)
    })
    .catch(err => {
      console.log('ERROR from setReminder', err);
    });
  }

  useEffect(()=>{
    setMinDate(calcMinDate());
    getReminders(id, setReminders);
  }, [])
  
  
  // toggles state used for conditional rendering AND if command === close: reset newImgName and newImgArr
  const handleAddImgClick = (command) => {
    if(command === 'close') {
      setNewImgName('');
      setNewImgArr([]);
    }
    addImageMode ? setAddImageMode(false) : setAddImageMode(true);
  }
  
  const handleImageClick = (img) => {
    lightboxMode ? setLightboxMode(false) : setLightboxMode(img);
  }

  const handleImageFormSubmit = (e) => {
    e.preventDefault();
    console.log(newImgName, '\n', newImgArr[0].name)
        const formData = new FormData()
    formData.append()
    // axios.post('/testThree', { formData })
    // .then((res) => {
      //   console.log('res from testThree',res);
    // })
    // .catch(error =>{
    //   throw new Error(error);
    // })
  }
  
  const checkTodayReminders = (reminderArr)=>{
    triggerAlerts(reminderArr, store)
  }
    // reminderArr.forEach(reminder => {
      
    //   const rem = new Date(reminder.date);
    //   const today = new Date();
    //   console.log('reminder>>',rem)
    //   console.log('today', today)

    //   if (rem == today) alert('this is a reminder 🥳')
    // })
  // Interactive component/element toggle handlers
  const hvSubtextClassesToggle = (input) => {
    if (input === 'total') {
      return setSubtextClasses('total');
    }
    if (input === 'info') {
      return setSubtextClasses('info');
    }
    setSubtextClasses(false);
  }
  const handleItemMenuClick = (e) => {
    e.preventDefault();
    itemMenuMode ? setItemMenuMode(false) : setItemMenuMode(true);
  }
  
  
  // FOR TESTING
  // const checkTodayReminders = (reminderArr)=>{
  //   triggerAlerts(reminderArr, store)
  // }
  // const handleAlertTriggerClick = (e) => {
    //   e.preventDefault();
    //   axios.get('/reminders', {params: id})
  //   .then(res => {
  //     checkTodayReminders(res.data)
  //   })
  // }


  return (
    <div className="receipt-item">
        {/* conditionally displayed lightbox for images in the thumbnail-container below, component is here to position absolutely in relation to receipt-item div/ReceiptItem [**extract into seperate component**] */}
        {lightboxMode && <Lightbox img={img} handleImageClick={handleImageClick} />}
        {/* conditionally displayed EditReceipt component */}
        {editReceiptMode && <EditReceipt currentInfo={currentInfo} setEditReceiptMode={() => setEditReceiptMode()} user={user} receipts={receipts} setReceipts={setReceipts} />}
        <h2>
          {store}
          <div className="menu-button" onClick={(e) => handleItemMenuClick(e)}>
            {itemMenuMode ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faBars} /> }
          </div>
          <ul className={itemMenuMode ? "item-menu active": "item-menu"}>
            <li><button onClick={(e) => {handleReminderClick(e); handleItemMenuClick(e)}} >reminders</button></li>
            <li><button onClick={(e) => {handleEditClick(e); handleItemMenuClick(e)}} >edit</button></li>
            <li><button onClick={(e) => {handleDeleteClick(e); handleItemMenuClick(e)}} >delete</button></li>
          </ul>
        </h2>
        <section className="item-content">
          <div className="info-container">
            <div onMouseEnter={() => hvSubtextClassesToggle('info')} onMouseLeave={() => hvSubtextClassesToggle(false)}>
              {subtextClasses === 'info' ?
                  infoSwitch? 
                    <div className="subtext active" onClick={() => setInfoSwitch(false)} >Purchased <strong>{purchaseDate}</strong></div>
                  :
                    <div className="subtext active" onClick={() => setInfoSwitch(true)} >Return by <strong>{returnBy}</strong></div>
                :
                <></>
              }
              <div><strong>{daysLeft} </strong> days left</div>
            </div>
            <div  onMouseEnter={() => hvSubtextClassesToggle('total')} onMouseLeave={() => hvSubtextClassesToggle(false)}>
              {subtextClasses === 'total' ?
                  <div className="subtext total active">Total</div>
                :
                  <></>
              }
              <div>{totalCost}</div>
            </div>
          </div>
        </section>
          
          {/* thumbnail images */}
          <div className="thumbnail-container">
            <img onClick={() => handleImageClick(img)} src={img || "http://source.unsplash.com/400x400?error"} alt="receipt" ></img>
            <div className="add" onClick={() => handleAddImgClick('open')}><FontAwesomeIcon icon={faPlus} /></div>
          </div>

          {/* reminder chips */}
          <section className="reminder-chips">
            {reminders.length > 0 ?
              <>
                {reminders.map(reminder => {
                  return <ReminderChip id={reminder.id} date={reminder.date} return_by={return_by} receipt_id={id} />
                })}
                <div className="add" onClick={() => handleAddReminderClick('')} ><FontAwesomeIcon icon={faPlus} /></div>
              </>
            :
            <div className="add" onClick={() => handleAddReminderClick('')} ><FontAwesomeIcon icon={faPlus} />&nbsp;Add Reminder</div>
            }
          </section>

          {/* conditionally displayed AddReminder form [**extract into seperate component**] */}
          <div className={editReminderMode ? "edit-reminders active" : "edit-reminders"}>
            <div className="close" onClick={() => handleAddReminderClick('close')}><FontAwesomeIcon icon={faClose} /></div>
            <form>
              <div>
                <label htmlFor="new-image">New reminder</label>
                <input
                  type="date"
                  id="new-reminder"
                  min={minDate}
                  onChange={e => {setNewReminder(e.target.value);}}
                  className="add-input"
                  />
              </div>
              <div className="new-reminder-preview">
                <div className="reminder-chip">{newReminderDate}</div>
              </div>
              <button onClick={(e)=> handleReminderSubmit(e, id, newReminderDate)}>Add reminder</button>
            </form>
          </div>

          <div className={addImageMode ? "add-image active" : "add-image"}>
            <div className="close" onClick={() => handleAddImgClick('close')}><FontAwesomeIcon icon={faClose} /></div>
            <form>
              <div>
                <label htmlFor="new-image">Click to add new images</label>
                <input
                  type="file"
                  id="new-image"
                  accept="image/png, image/jpeg"
                  onChange={e => {setNewImgName(e.target.value); setNewImgArr([...e.target.files])}}
                  className="add-input"
                  multiple
                  />
              </div>
              <div className="new-images-preview">
                <img src={img} alt="receipt" />
                {newImgArr.forEach(image=>{
                  <p>{image}</p>
                })}
              </div>
              <button onClick={(e)=> handleImageFormSubmit(e, newImgName, newImgArr)}>Add images</button>
            </form>
          </div>

          {/* conditionally displayed confirmation interface [**extract into seperate component**] */}
          {confirmDeleteMode?
            <div className="confirm-delete">
              <h1>Confirm Delete?</h1>
              <section className="buttons">
                <button onClick={() => setConfirmDeleteMode(false)} className="confirm">Back</button>
                <button onClick={() => { deleteReceipt(id); setConfirmDeleteMode(false); } } className="discard">Delete</button>
              </section>
            </div>
          :
            <></>
          }
    </div>
  );
}