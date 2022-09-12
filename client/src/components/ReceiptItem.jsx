import React, { className, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Item from "./Item.jsx"
import "./ReceiptItem.css";


export default function ReceiptItem(props) {
  const [items, setItems] = useState([])
  const {id, img, store, date, total, return_by } = props;
  const purchaseDate = moment.utc(date.toLocaleString()).format("ddd, MMMM Do")
  const daysLeft = moment(return_by).endOf('day').fromNow(); 
  const totalCost = (total/100).toFixed(2)

  const getItems = (id) => {
    axios.get(`/items/${id}`)
      .then(d => {
        return setItems(d.data);
      })
      .catch(err => {
        return console.log("ERROR FROM getItems()", err)
      })
  }

  useEffect(() => {
    getItems(id);
  }, [])

  return (
    <div className="receipt-item">
      <img src={img}></img>
      <h2>{store}</h2>
      <h4>Purchased on: {purchaseDate}</h4>
      {items.map((item) => {
        return <Item key={item.key} id={item.id} name={item.name} price={item.price} quantity={item.quantity} return_by={item.return_by} ></Item>
      })}
      <p>Total ${totalCost}</p>
      <p>Return expires {daysLeft}.</p>
    </div>
  );
}