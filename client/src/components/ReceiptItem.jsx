import React, { className } from "react";
import "./ReceiptItem.css";

export default function ReceiptItem() {
  return (
    <div className="receipt-item">
      <h2>Store name</h2>
      <p>Item 1</p>
      <p>Item 2</p>
      <p>Total $0</p>
      <p>9 days left to return</p>
    </div>
  );
}