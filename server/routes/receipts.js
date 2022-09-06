const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query("SELECT * FROM receipts;")
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
      `INSERT INTO receipts(user_id, img, store, date, return_by, total) VALUES($1, $2, $3, $4, $5, $6);`, 
      [user_id, img, store, date, return_by, total]
    ).then((res) => {
      console.log('POST SUCCESS', res);
    }).catch(err => {
      console.log("ERR from post'/receipt':", err)
    })
  })
  
  return router;
};
