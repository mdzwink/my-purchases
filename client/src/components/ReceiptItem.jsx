import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "./ReceiptItem.css";
import EditReceipt from "./EditReceipt.jsx";
import { getReceipts, checkForReminders, triggerAlerts } from "./helpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars, faX, faClose } from '@fortawesome/free-solid-svg-icons';



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
  const [editMode, setEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [infoSwitch, setInfoSwitch] = useState(false);
  const [subtextClasses, setSubtextClasses] = useState(false);
  const [itemMenuState, setItemMenuState] = useState(false);
  const [addImage, setAddImage] = useState(false);
  
  const purchaseDate = moment.utc(date.toLocaleString()).format("ddd, MMMM Do");
  const returnBy = moment.utc(return_by.toLocaleString()).format("ddd, MMM Do");
  const daysLeft = moment(return_by).endOf('day').fromNow(); 
  const totalCost = (total/100).toFixed(2);


  const handleEditClick = (e) => {
    e.preventDefault();
    console.log('edit click')
    setEditMode(true)
  }
  
  const handleDeleteClick = (e, receipt_id) => {
    e.preventDefault();
    console.log('delete click')

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

  useEffect(() => {
    console.log('>> >>editmode:', editMode)
    console.log('>> >>confirmDelete:', confirmDelete)
  }, [editMode, confirmDelete])

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
    e.preventDefault()
    itemMenuState ? setItemMenuState(false) : setItemMenuState(true);
  }

  const handleAddImgClick = () => {
    addImage ? setAddImage(false) : setAddImage(true);
  }

  return (
    <>
      <div className="receipt-item">
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
              <li><button onClick={(e) => {handleEditClick(e); handleItemMenuClick(e)}} >edit</button></li>
              <li><button onClick={(e) => {handleDeleteClick(e, id); handleItemMenuClick(e)}} >delete</button></li>
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
                <div>${totalCost}</div>
              </div>
            </div>
            <div className="thumbnail-container">
              <img src={img || "http://source.unsplash.com/400x400?sunrise"} alt="receipt" ></img>
              <div className="plus" onClick={() => handleAddImgClick()}><FontAwesomeIcon icon={faPlus} /></div>
            </div>
            <div className={addImage ? "add-image active" : "add-image"}>
              <div className="close" onClick={() => handleAddImgClick()}><FontAwesomeIcon icon={faClose} /></div>
              <form>
                <h3>Add images</h3>
                <input type="file" />
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