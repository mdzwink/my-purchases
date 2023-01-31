import React, { className } from "react";
import '../App.css'

export default function Button(props) {
  return (
    <button className="button">
      {props.children}
    </button>
  );
}