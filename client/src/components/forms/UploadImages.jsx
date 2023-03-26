import React, { useState } from "react";
import '../ReceiptItem.css';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const UploadImages = (props) => {
  const { user, receipt, setReceipts, updateReceipts, handleAddImgClick } = props;
  const user_id = user.id;
  const [img, setImg] = useState('');
  const [store, setStore] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [newImgName, setNewImgName] = useState('');
  const [newImgArr, setNewImgArr] = useState('');


  const handleImageFormSubmit = (e) => {
    e.preventDefault();
    console.log(newImgName, '\n', newImgArr[0].name)
        const formData = new FormData()
    formData.append()
  }


  //replaces receipt info and engages box-shadow
  const handleForm = (e) => {
    e.preventDefault();
    //resetting formError
    setErrorMsg('');
    //setting form error if not all fields are filled upon submission
    if (!img) {
      return setErrorMsg('Error, please include image url.');      
    }
    if (!store) {
      return setErrorMsg('Error, please include store name.');      
    }
    const newReceipt = {

    }
    axios.post('/receipts/update', newReceipt)
    .then(res => {
      updateReceipts(res.data[0]);
    })
    .then(res => {
      return setImg('');
    })
    .catch(err => {
      console.log("ERR from post'/receipt'", err)
    })
  }

  return (
    <>
      <div className="close" onClick={() => handleAddImgClick('close')}><FontAwesomeIcon icon={faClose} /></div>
      <form>
        <div>
          <label htmlFor="new-image">Click to add new images</label>
          <input
            type="file"
            id="new-image"
            accept="image/png, image/jpeg"
            onChange={e => {setNewImgName(e.target.value); setNewImgArr([...e.target.files])}}
            className="add-input"
            multiple
            />
        </div>
        <div className="new-images-preview">
          <img src={img} alt="receipt" />
          {newImgArr.forEach(image=>{
            <p>{image}</p>
          })}
        </div>
        <button onClick={(e)=> handleImageFormSubmit(e, newImgName, newImgArr)}>Add images</button>
      </form>
    </>
  );
}

export default UploadImages;