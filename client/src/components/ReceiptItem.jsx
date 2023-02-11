import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "./ReceiptItem.css";
import EditReceipt from "./EditReceipt.jsx";
import { getReceipts, setReminder, triggerAlerts } from "./helpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars, faX, faClose, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';



export default function ReceiptItem(props) {
  const { user, receipts, setReceipts, id, img, store, date, total, return_by } = props;
  const currentInfo = {
    id,
    img,
    store,
    date,
    total,
    return_by
  }
  const [editReminderMode, setEditReminderMode] = useState(false);
  const [addImageMode, setAddImage] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [infoSwitch, setInfoSwitch] = useState(false);
  const [subtextClasses, setSubtextClasses] = useState(false);
  const [itemMenuState, setItemMenuState] = useState(false);
  const [lightboxActive, setLightboxActive] = useState(false);
  const [newImgName, setNewImgName] = useState('');
  const [newImgArr, setNewImgArr] = useState('');
  const [newReminderArr, setNewReminderArr] = useState('');

  let image;
  
  const purchaseDate = moment.utc(date.toLocaleString()).format("ddd, MMMM Do");
  const returnBy = moment.utc(return_by.toLocaleString()).format("ddd, MMM Do");
  const daysLeft = moment(return_by).endOf('day').fromNow(); 
  const totalCost = total;

  const handleReminderClick = (e) => {
    e.preventDefault();
    setEditReminderMode(true)
  }

  const handleEditClick = (e) => {
    e.preventDefault();
    setEditMode(true)
  }
  
  const handleDeleteClick = (e) => {
    e.preventDefault();
    setConfirmDelete(true);
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

  const alertsThem = (gold) => {
    return triggerAlerts(id, gold, store);
  }
  // checkForReminders(id, store, alertsThem)

  const subtextClassesToggle = (input) => {
    // if enter total set subtextClass to 'total
    // if enter info set subtextClass to 'info'
    // 
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
    itemMenuState ? setItemMenuState(false) : setItemMenuState(true);
  }

  const handleAddImgClick = (command) => {
    if(command === 'close') {
      setNewImgName('');
      setNewImgArr('');
    }
    addImageMode ? setAddImage(false) : setAddImage(true);
  }
  const handleAddReminderClick = (command) => {
    if(command === 'close') {
      setNewReminderArr('');
    }
    editReminderMode ? setEditReminderMode(false) : setEditReminderMode(true);
  }
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
  
  const handleImageClick = (img) => {
    lightboxActive ? setLightboxActive(false) : setLightboxActive(img);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log('image:',image)
    formData.append("file", newImgArr, newImgName);

    axios.post('/testThree', { formData })
    .then((res) => {
      console.log('res from testThree',res);
    })
    .catch(error =>{
      throw new Error(error);
    })
  }
  
  const checkTodayReminders = (reminderArr)=>{
    triggerAlerts(reminderArr, store)
    // reminderArr.forEach(reminder => {
      
    //   const rem = new Date(reminder.date);
    //   const today = new Date();
    //   console.log('reminder>>',rem)
    //   console.log('today', today)

    //   if (rem == today) alert('this is a reminder 🥳')
    // })
  }

  const handleAlertTriggerClick = (e) => {
    e.preventDefault();
    axios.get('/reminders', {params: id})
    .then(res => {
      checkTodayReminders(res.data)
    })
  }

  return (
    <>
      <div className="receipt-item">
          {lightboxActive ?
            <div className="lightbox" onClick={() => handleImageClick(false)}>
              <div className="back"><FontAwesomeIcon icon={faArrowLeft} /></div>
              <img src={img} alt='receipt image'/>
              <div className="forward"><FontAwesomeIcon icon={faArrowRight} /></div>
            </div>
          :
            <></>
          }
          {editMode?
            <div>
              <EditReceipt currentInfo={currentInfo} setEditMode={setEditMode} user={user} receipts={receipts} setReceipts={setReceipts} />
            </div>
          :
            <></>
          }
          <h2>
            {store}
            <div className="menu-button" onClick={(e) => handleItemMenuClick(e)}>
              {itemMenuState ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faBars} /> }
            </div>
            <ul className={itemMenuState ? "item-menu active": "item-menu"}>
              <li><button onClick={(e) => {handleAlertTriggerClick(e); handleItemMenuClick(e)}} >alert trigger</button></li>
              <li><button onClick={(e) => {handleReminderClick(e); handleItemMenuClick(e)}} >reminders</button></li>
              <li><button onClick={(e) => {handleEditClick(e); handleItemMenuClick(e)}} >edit</button></li>
              <li><button onClick={(e) => {handleDeleteClick(e); handleItemMenuClick(e)}} >delete</button></li>
            </ul>
          </h2>
          <section className="item-content">
            <div className="info-container">
              <div onMouseEnter={() => subtextClassesToggle('info')} onMouseLeave={() => subtextClassesToggle(false)}>
                {subtextClasses === 'info' ?
                    infoSwitch? 
                      <div className="subtext active" onClick={() => setInfoSwitch(false)} >Purchased <strong>{purchaseDate}</strong></div>
                    :
                      <div className="subtext active" onClick={() => setInfoSwitch(true)} >Return by <strong>{returnBy}</strong></div>
                  :
                  <></>
                }
                <div><strong># </strong> days left</div>
              </div>
              <div  onMouseEnter={() => subtextClassesToggle('total')} onMouseLeave={() => subtextClassesToggle(false)}>
                {subtextClasses === 'total' ?
                    <div className="subtext total active">Total</div>
                  :
                    <></>
                }
                <div>{totalCost}</div>
              </div>
            </div>
            <div className="thumbnail-container">
              <img onClick={() => handleImageClick(img)} src={img || "http://source.unsplash.com/400x400?error"} alt="receipt" ></img>
              <div className="plus" onClick={() => handleAddImgClick('open')}><FontAwesomeIcon icon={faPlus} /></div>
            </div>
            <div className={editReminderMode ? "edit-reminders active" : "edit-reminders"}>
              <div className="close" onClick={() => handleAddReminderClick('close')}><FontAwesomeIcon icon={faClose} /></div>
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
                    onChange={e => {setNewImgName(e.target.value); setNewImgArr(e.target.files[0])}}
                    className="add-input"
                    multiple
                    />
                </div>
                <div className="new-images-preview">
                  <img src={img} alt="receipt" />
                  <p>{newImgName}</p>
                </div>
                <button onClick={(e)=> handleSubmit(e, newImgName, newImgArr)}>Add images</button>
              </form>
            </div>
            {confirmDelete?
              <div className="confirm-delete">
                <h1>Confirm Delete?</h1>
                <section className="buttons">
                  <button onClick={() => setConfirmDelete(false)} className="confirm">Back</button>
                  <button onClick={() => { deleteReceipt(id); setConfirmDelete(false); } } className="discard">Delete</button>
                </section>
              </div>
            :
              <></>
            }
          </section>      
      </div>
    </>
  );
}