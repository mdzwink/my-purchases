import axios from "axios";

 // export function getItems(id) {
  //   axios.get(`/items/${id}`)
  //   .then(d => {
  //     return setItems(d.data);
  //   })
  //   .catch(err => {
  //     return console.log("ERROR FROM getItems()", err)
  //   })
  // }
  // useEffect(() => {
  //   getItems(id);
  // }, [])

export function getReceipts(user, setReceipts) {
  axios.get('/receipts', {
    params: user.id
  })
  .then(d => {
    setReceipts(d.data);
  })
  .catch(err => {
    console.log("ERROR FROM getReceipts()", err);
  });
}
