import React, { useEffect } from "react";
import ReceiptItem from "./ReceiptItem";
import "./ReceiptList.css";
import { getReceipts } from './helpers'


export default function ReceiptList(props) {
  const { user, receipts, setReceipts } = props;

  useEffect(() => {
    getReceipts(user, setReceipts);
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