import React, { useState, useEffect } from "react";
import ReceiptItem from "./ReceiptItem";
import "./ReceiptList.css";
import { getReceipts } from './helpers'


export default function ReceiptList(props) {
  const { user, receipts, setReceipts, filteredReceipts } = props;
  // const { filteredReceipts, setFilteredReciepts } = useState([...receipts]);

  useEffect(() => {
    getReceipts(user, setReceipts);
  }, [])

  //need to trigger with specific receipt but also not on every receipt reload fixed with alert deleted?

  return (
    <section className="receipt-list">
      <ul>
        {receipts? receipts.map(receipt => (
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