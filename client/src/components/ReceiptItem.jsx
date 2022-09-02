import React, { className, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "./ReceiptItem.css";


export default function ReceiptItem(props) {
  const {id, store, date, total, return_by} = props;
  const purchaseDate = moment.utc(date.toLocaleString()).format("ddd, MMMM Do")
  const totalCost = (total/100).toFixed(2)
  const [items, setItems] = useState([])

  const getItems = (id) => {
    axios.get(`/items/${id}`)
      .then((data) => {
        setItems(data.data);
        console.log("Items:", items)
      })
      .catch(e => {
        console.log("ERROR FROM getItems()", e)
      })
  }

  useEffect(() => {
    getItems(id);
  }, [])

  return (
    <div className="receipt-item">
      <h2>{store}</h2>
      <h4>Purchased on: {purchaseDate}</h4>
      <p>Item 1</p>
      <p>Item 2</p>
      <p>Total ${totalCost}</p>
      <p>9 days left to return</p>
    </div>
  );
}