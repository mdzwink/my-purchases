import React, { useState, useEffect } from "react";
import ReceiptItem from "./ReceiptItem";
import "./ReceiptList.css";
import axios from "axios";


export default function ReceiptList () {
  const [receipts, setReceipts] = useState([]);

  const getReceipts = () => {
    axios.get('/receipts')
    .then(d => {
      setReceipts(d.data);
    })
    .catch(err => {
      console.log("ERROR FROM getReceipts()", err);
    });
  }

  useEffect(() => {
    getReceipts();
  }, [])

  return (
    <section className="receipt-list">
      <ul>
        {receipts.map((receipt) => (
          <li>
            <ReceiptItem 
              key={receipt.id}
              id={receipt.id}
              user_id={receipt.user_id}
              img={receipt.img}
              store={receipt.store}
              date={receipt.date}
              return_by={receipt.return_by}
              total={receipt.total}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}