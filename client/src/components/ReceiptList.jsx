import ReceiptItem from "./ReceiptItem";
import "./ReceiptList.css";


export default function ReceiptList () {
  return (
    <ul className="receipt-list">
      <ReceiptItem />
      <ReceiptItem />
      <ReceiptItem />
      <ReceiptItem />
      <ReceiptItem />
    </ul>
  );
}