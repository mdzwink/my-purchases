import React, { className, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
// import { getItems } from "./helpers";
// import Item from "./Item.jsx";
import "./ReceiptItem.css";
import EditReceipt from "./EditReceipt.jsx";


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
  // const [items, setItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // const [purchaseDate, setPurchaseDate] = useState(date)
  
  const purchaseDate = moment.utc(date.toLocaleString()).format("ddd, MMMM Do");
  const daysLeft = moment(return_by).endOf('day').fromNow(); 
  const totalCost = (total/100).toFixed(2);
  
  const handleEditButton = () => {
    setEditMode(true)
  }
  
  const handleDeleteButton = (receipt_id) => {
    setConfirmDelete(true);
  }
  const deleteReceipt = (receipt_id) => {
    axios.post('/receipts/delete', receipt_id)
    .then((res) => {
      return console.log('res from delete, handleDelete', res.data);
    })
  }

 
  

  return (
    <>
      {confirmDelete?
        <div className="receipt-item">
          <h1>Confirm Delete?</h1>
          <div>
            <div onClick={() => { deleteReceipt(id); setConfirmDelete(false); }}>Yes</div>
            <div onClick={() => setConfirmDelete(false)}>No</div>
          </div>
        </div>
      :
        <div className="receipt-item">
          <img src={img || "http://source.unsplash.com/400x400?sunrise"}></img>
          {editMode?
            <div>
              <EditReceipt currentInfo={currentInfo} setEditMode={setEditMode} user={user} receipts={receipts} setReceipts={setReceipts} />
            </div>
          :
            <div>
              <h2>{store}</h2>
              <h4>Purchased on: {purchaseDate}</h4>
              {/* {items.map((item) => {
                return <Item key={item.key} id={item.id} name={item.name} price={item.price} quantity={item.quantity} return_by={item.return_by} ></Item>
              })} */}
              <p>Total ${totalCost}</p>
              <p>Return expires {daysLeft}.</p>
              <section className="manage-receipt-options">
                <div className="edit-button" onClick={() => handleEditButton(id)}>edit</div>
                <div className="delete-button" onClick={() => handleDeleteButton(id)}>delete</div>
              </section>
            </div>
          }
        </div>
      }
    </>
  );
}