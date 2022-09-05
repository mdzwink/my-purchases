import axios from "axios";

export function getReceipts() {
  axios.get('/receipts')
  .then((data) => {
    return(data.data);
  })
  .catch(e => {
    console.log("ERROR FROM getReceipts()", e);
  });
}

export function getItems(id) {
  axios.get(`/items/${id}`)
    .then((d) => {
      return(d.data);
    })
    .catch(e => {
      console.log("ERROR FROM getItems()", e)
    })
}

