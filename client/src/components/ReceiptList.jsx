import React, { useEffect, useState } from "react";
import ReceiptItem from "./ReceiptItem";
import "./ReceiptList.css";
import { getReceipts } from './helpers'
import axios from "axios";


export default function ReceiptList(props) {
  const { user } = props;
  const [receipts, setReceipts] = useState([]);

  // useEffect(() => {
  //   getReceipts(user)
  //     .then(d => {
  //       setReceipts(d.data);
  //     })
  // }, [])

  useEffect(() => {
    console.log(user.id)
    axios.get('/receipts', { params: user.id })
    .then(d => {
      setReceipts(d.data);
    })
    .catch(err => {
      console.log("ERROR FROM getReceipts()", err);
    });
  }, [])

  return (
    <section className="receipt-list-container">
      <ul className="receipt-list">
        {receipts? receipts.map(receipt => (
            <li key={receipt.id} className="receipt">
              <ReceiptItem
                key={receipt.id}
                {...receipt}
                user
                receipts
                setReceipts
                getReceipts
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