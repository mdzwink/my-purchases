import React, { useState } from "react";
import axios from "axios";
import moment, { utc } from "moment";
import "./ReceiptItem.css";
import EditReceipt from "./EditReceipt.jsx";
import { getReceipts, triggerAlerts } from "./helpers";
import { useDispatch } from "react-redux";
import { setUserReceipts, deleteStateReceipt } from "../features/receipts/receiptSlice";


export default function ReceiptItem(props) {
  const { user, id, img, store, date, total, return_by } = props;
  const dispatch = useDispatch()
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
  
  const purchaseDate = moment.utc(date.toLocaleString()).format("ddd, MMMM Do");
  const daysLeft = moment(return_by).endOf('day').fromNow(); 
  const totalCost = (total/100).toFixed(2);


  const handleEditButton = () => {
    setEditMode(true)
  }
  
  const reloadReceipts = () => {
    getReceipts(user)
      .then(d => {
        if(d) {
          dispatch(setUserReceipts(d));
          return d;
        }
        return console.log('receipts re-loaded')
      })
      .catch(err => {
        console.log('Err from Receiptlist',err)
      })
  }
  
  const removeReceipt = (receipt_id) => {
    dispatch(deleteStateReceipt(receipt_id));
  }
  
  const handleDeleteButton = () => {
    setConfirmDelete(true);
  }
  const deleteReceipt = (receipt_id) => {
    axios.post('/receipts/delete', { receipt_id: receipt_id } )
    .then(() => {
      return removeReceipt(receipt_id);
    })
    .catch(err => { 
      console.log('ERROR from deleteReceipt():', err);
    })
  }

  const alertsThem = (gold) => {
    return triggerAlerts(id, gold, store);
  }
  // checkForReminders(id, store, alertsThem)

  const formattedDate = moment.utc(date.toLocaleString()).format("YYYY-MM-DD");

  
  return (
    <>
      {confirmDelete?
        <div className="receipt-item">
          <h1>Confirm Delete?</h1>
          <div className="manage-receipt-options">
            <div onClick={() => { deleteReceipt(id); setConfirmDelete(false); } } className="button">Yes</div>
            <div onClick={() => setConfirmDelete(false)} className="caution-button">No</div>
          </div>
        </div>
      :
        <div className="receipt-item">
          <img src={img || "http://source.unsplash.com/400x400?sunrise"} alt="receipt" ></img>
          {editMode?
            <div>
              <EditReceipt currentInfo={currentInfo} setEditMode={setEditMode} user={user}/>
            </div>
          :
          <div>
              <h3>{formattedDate}</h3>
              <h3>{date}</h3>
              <h2>{store}</h2>
              <h4>Purchased on: {purchaseDate}</h4>
              <p>Total ${totalCost}</p>
              <p>Return expires {daysLeft}.</p>
              <section className="manage-receipt-options">
                <div className="button" onClick={() => handleEditButton(id)}>edit</div>
                <div className="caution-button" onClick={() => handleDeleteButton(id)}>delete</div>
              </section>
            </div>
            }

        </div>
      }
    </>
  );
}