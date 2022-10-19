import React, { useEffect } from "react";
import ReceiptItem from "./ReceiptItem";
import "./ReceiptList.css";
import { getReceipts } from './helpers'
import { useDispatch, useSelector } from 'react-redux';
import { setReceiptState, addReceipt, removeReceipt } from "../features/receipts/receiptSlice";


export default function ReceiptList(props) {
  const { user, setReceipts, setAllReceipts } = props;
  const receiptState = useSelector(state => state.receipt);
  const dispatch = useDispatch();
  const receipts = receiptState.receipts; 

  const reloadReceipts = () => {
    getReceipts(user)
      .then(d => {
        if(d) {
          dispatch(setReceiptState(d));
          return d;
        }
        return console.log('receipts loaded')
      })
      .catch(err => {
        console.log('Err from Receiptlist',err)
      })
  }

  useEffect(() => {
    reloadReceipts();
  }, [])


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