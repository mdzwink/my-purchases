const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    // use user_id to select specific receipts
    const user_id = req.query[0]
    db.query("SELECT * FROM receipts WHERE user_id = $1 ORDER BY return_by ASC;", [user_id])
      .then(d => {
        return res.json(d.rows);
      })
      .catch(err => {
        console.log("Error from get'/receipts':", err)
      });
  });

  router.post('/', (req, res) => {
    const { user_id, img, store, date, return_by, total } = req.body;
    db.query(
      `INSERT INTO receipts(user_id, img, store, date, return_by, total) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`, 
      [user_id, img, store, date, return_by, total]
      ).then((data) => {
        console.log('>>>RECEIPT POST SUCCESS<<<', )
        return res.json(data.rows);
      }).catch(err => {
      console.log(store)
      console.log("ERROR from post'/receipt':", err)
    })
  })
  
  router.post('/update', (req, res) => {
    const { user_id, updatedImg, updatedStore, updatedDate, updatedReturn_by, updatedTotal, id } = req.body;
    db.query(
      `UPDATE receipts SET user_id = $1, img = $2, store = $3, date = $4, return_by = $5, total = $6 WHERE id = $7 RETURNING *;`, 
      [user_id, updatedImg, updatedStore, updatedDate, updatedReturn_by, updatedTotal, id]
    ).then((data) => {
      return res.json(data.rows);
    }).catch(err => {
      console.log("ERROR from POST-/receipts/update:", err)
    })
  })

  router.post('/delete', (req, res) => {
    const receipt_id = req.body.receipt_id;
    db.query(
      'DELETE FROM receipts WHERE id = $1;',
      [ receipt_id ]
    ).then(() => {
      return res.send(`Receipt #${receipt_id} Deleted`)
    })
    .catch(err => {
      console.log("ERROR from POST'/receipts/delete':", err)
    })
  })

  return router;
};
