import React, { useEffect, useState } from "react";
import ReceiptItem from "./ReceiptItem";
import "./ReceiptList.css";
import axios from "axios";
import AddReceiptForm from "./AddReceiptForm";


export default function ReceiptList(props) {
  const { user, addReceiptMode, addFormToggle } = props;
  const [receipts, setReceipts] = useState([]);
  
  const getReceipts = () => {
    axios.get('/receipts', { params: user.id })
    .then(d => {
      setReceipts(d.data);
      console.log('receipts', d.data)
    })
    .catch(err => {
      throw new Error(err);
    });
  }
  useEffect(() => {
    getReceipts();
  }, [])

  return (
    <section className="receipt-list-container">
      {addReceiptMode && <AddReceiptForm user={user} addFormToggle={addFormToggle} getReceipts={getReceipts}/>}
      <ul className="receipt-list">
        {receipts? receipts.map(receipt => (
            <li key={receipt.id} className="receipt">
              <ReceiptItem
                key={receipt.id}
                {...receipt}
                user={user}
                getReceipts={getReceipts}
              />
            </li>
        ))
        :
          <div>No receipts to show</div>
        }
      </ul>
    </section>
  );
}