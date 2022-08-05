import React, { className } from "react";

export default function Add() {
  return (
    <>
      <form >
        <label>
          Receipt:
          <input type="text" name="new-receipt"/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
      <button>Add New receipt</button>
    </>
  );
}