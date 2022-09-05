import React, { className, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "./ReceiptItem.css";


export default function Item(props) {
  const { id, receipt_id, name, price, quantity, return_by } = props;
  const returnDate = moment.utc(return_by.toLocaleString()).format("ddd, MMMM Do")
  const daysLeft = moment(return_by).endOf('day').fromNow(); 
  const itemCost = (price/100).toFixed(2)

  return (
    <div className="receipt-item">
      <h5>Item: {name}</h5>
      <p>Item price: {quantity}</p>
      <p>Item price: {itemCost}</p>
      {return_by && <p>Return this by: {returnDate}</p>}
    </div>
  );
}

