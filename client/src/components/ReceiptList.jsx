import React, { useEffect } from "react";
import ReceiptItem from "./ReceiptItem";
import "./ReceiptList.css";
import { getReceipts } from './helpers'
import { useDispatch, useSelector } from 'react-redux';
import { setUserReceipts, filterToggle, setFilteredReceipts } from "../features/receipts/receiptSlice";


export default function ReceiptList(props) {
  const { user } = props;
  const userReceipts = useSelector(state => state.receipt.userReceipts);
  const filteredReceipts = useSelector(state => state.receipt.filteredReceipts); 
  const filterSwitch = useSelector(state => state.receipt.filterSwitch)
  const dispatch = useDispatch();

  const reloadReceipts = () => {
    getReceipts(user)
      .then(d => {
        if(d) {
          dispatch(setUserReceipts(d));
          dispatch(setFilteredReceipts(d));
          return d;
        }
        return console.log('receipts loaded')
      })
      .then(d => {
        console.log('test Redux user',userReceipts)
        console.log('test Redux filter',filteredReceipts)
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
        {userReceipts?

          filterToggle? 
            filteredReceipts.map(receipt => (
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
                  getReceipts={getReceipts}
                />
              </li>
            ))
          :
            userReceipts.map(receipt => (
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