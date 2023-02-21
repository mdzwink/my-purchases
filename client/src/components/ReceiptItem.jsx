import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "./ReceiptItem.css";
import EditReceipt from "./EditReceipt.jsx";
import { deleteReminder, getReceipts, getReminders, setReminder, triggerAlerts } from "./helpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars, faX, faClose, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ReminderChip from "./ReminderChip";



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
  const [editReceiptMode, setEditReceiptMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [infoSwitch, setInfoSwitch] = useState(false);
  const [subtextClasses, setSubtextClasses] = useState(false);
  const [itemMenuState, setItemMenuState] = useState(false);
  const [lightboxActive, setLightboxActive] = useState(false);
  const [newImgName, setNewImgName] = useState('');
  const [newImgArr, setNewImgArr] = useState([]);
  const [newReminderArr, setNewReminderArr] = useState('');

  const [reminderArr, setReminderArr] = useState([]);

  const localReminders = reminderArr.filter(reminder=>reminder.receipt_id === id)
  console.log(localReminders)
  
  const purchaseDate = moment.utc(date.toLocaleString()).format("ddd, MMMM Do");
  const returnBy = moment.utc(return_by.toLocaleString()).format("ddd, MMM Do");
  const daysLeft = moment(return_by).endOf('day').fromNow(); 
  const totalCost = total;

  // Click handlers
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
    setConfirmDelete(true);
  }
  const handleItemMenuClick = (e) => {
    e.preventDefault();
    itemMenuState ? setItemMenuState(false) : setItemMenuState(true);
  }
  const handleAddImgClick = (command) => {
    if(command === 'close') {
      setNewImgName('');
      setNewImgArr([]);
    }
    addImageMode ? setAddImage(false) : setAddImage(true);
  }
  const handleAddReminderClick = (command) => {
    if(command === 'close') {
      setNewReminderArr('');
    }
    editReminderMode ? setEditReminderMode(false) : setEditReminderMode(true);
  }
  // Hover handlers
  const subtextClassesToggle = (input) => {
    if (input === 'total') {
      return setSubtextClasses('total');
    }
    if (input === 'info') {
      return setSubtextClasses('info');
    }
    setSubtextClasses(false);
  }


  // updates db and reminderArr (to avoid complete rerender with with) with a new date
  const handleReminderSubmit = (e) => {
    e.preventDefault();
    setEditReminderMode(false);
    const receipt_id = id;
    const date = newReminderArr;
    const reminder = {
      receipt_id,
      date
    }
    axios.post('/reminders', reminder)
    .then(d => {
      getReminders(id, setReminderArr)
      .then(d => setReminderArr(d))   
    })
    .catch(err => {
      console.log('ERROR from setReminder', err);
    });
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

  // temp reminder alert check
  const checkTodayReminders = (reminderArr)=>{
    triggerAlerts(reminderArr, store)
  }
  const handleAlertTriggerClick = (e) => {
    e.preventDefault();
    axios.get('/reminders', {params: id})
    .then(res => {
      checkTodayReminders(res.data)
    })
  }


  // Image related
  
  const handleImageClick = (img) => {
    lightboxActive ? setLightboxActive(false) : setLightboxActive(img);
  }

  const handleImageFormSubmit = (e) => {
    e.preventDefault();
    console.log(newImgName, '\n', newImgArr[0].name)

    // axios.post('/testThree', { formData })
    // .then((res) => {
    //   console.log('res from testThree',res);
    // })
    // .catch(error =>{
    //   throw new Error(error);
    // })
  }


  // useEffect(()=>{
  //   getReminders(id, setReminderArr)    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // },[])

  

  return (
    <>
      <div className="receipt-item">
          {/* conditionally displayed lightbox for images in the thumbnail-container below, component is here to position absolutely in relation to receipt-item div/ReceiptItem [**extract into seperate component**] */}
          {lightboxActive ?
            <div className="lightbox" onClick={() => handleImageClick(false)}>
              <div className="back"><FontAwesomeIcon icon={faArrowLeft} /></div>
              <img src={img} alt='receipt image'/>
              <div className="forward"><FontAwesomeIcon icon={faArrowRight} /></div>
            </div>
          :
            <></>
          }
          {/* conditionally displayed EditReceipt component */}
          {editReceiptMode?
            <div>
              <EditReceipt currentInfo={currentInfo} setEditReceiptMode={setEditReceiptMode} user={user} receipts={receipts} setReceipts={setReceipts} />
            </div>
          :
            <></>
          }
          {/* Store name and ReceiptItem dropdown menu */}
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
          <div className="item-content">
            {/* receipt information */}
            <section className="info-container">
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
            </section>
            {/* thumbnail images */}
            <section className="thumbnail-container">
              <img onClick={() => handleImageClick(img)} src={img || "http://source.unsplash.com/400x400?error"} alt="receipt" ></img>
              <div className="add" onClick={() => handleAddImgClick('open')}><FontAwesomeIcon icon={faPlus} /></div>
            </section>
            {/* reminder chips */}
            <section className="reminder-chips">
              {reminderArr.length > 0 ?
                <>
                  {reminderArr.map(reminder => (
                    <div key={reminder.id} onClick={() => deleteReminder(reminder.id)}>{reminder.date}</div>
                    // <ReminderChip date={reminder} receiptDate={date} />
                  ))}
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
                    onChange={e => {setNewReminderArr(e.target.value);}}
                    className="add-input"
                    />
                </div>
                <div className="new-reminder-preview">
                  <div className="reminder-chip">{newReminderArr}</div>
                </div>
                <button onClick={(e)=> handleReminderSubmit(e)}>Add reminder</button>
              </form>
            </div>


{/* >>>>>>>>>>>>>>>>>> */}
            {/* conditionally displayed AddImages form [**extract into seperate component**] */}
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

{/* >>>>>>>>>>>>>>>>>>>>>> */}

            {/* conditionally displayed confirmation interface [**extract into seperate component**] */}
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
          </div>      
      </div>
    </>
  );
}