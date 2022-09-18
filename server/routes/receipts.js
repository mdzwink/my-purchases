const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    // use user_id to select specific receipts
    const user_id = req.query[0]
    db.query("SELECT * FROM receipts WHERE user_id = $1;", [user_id])
      .then(d => {
        return res.json(d.rows);
      })
      .catch(e => {
        console.log("Error from get'/receipts':", e)
      });
  });

  router.post('/', (req, res) => {
    const { user_id, img, store, date, return_by, total } = req.body;
    db.query(
      `INSERT INTO receipts(user_id, img, store, date, return_by, total) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`, 
      [user_id, img, store, date, return_by, total]
    ).then((data) => {
      console.log('>>>RECEIPT POST SUCCESS<<<')
      return res.json(data.rows);
    }).catch(err => {
      console.log("ERROR from post'/receipt':", err)
    })
  })
  
  return router;
};
