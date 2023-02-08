import React, { useEffect } from "react";
import ReceiptItem from "./ReceiptItem";
import "./ReceiptList.css";
import { getReceipts } from './helpers'


export default function ReceiptList(props) {
  const { user, receipts, setReceipts, setAllReceipts } = props;

  useEffect(() => {
    getReceipts(user, setReceipts, setAllReceipts);
  }, [])

  return (
    <section className="receipt-list-container">
      <ul className="receipt-list">
        {receipts? receipts.map(receipt => (
            <li className="receipt">
              <ReceiptItem 
                key={receipt.id}
                id={receipt.id}
                user_id={receipt.user_id}
                img={receipt.img}
                store={receipt.store}
                date={receipt.date}
                return_by={receipt.return_by}
                total={receipt.total}
                user={user}
                receipts={receipts}
                setReceipts={setReceipts}
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