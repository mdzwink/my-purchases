const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    const receipt_id = req.query[0];
    db.query("SELECT * FROM reminders WHERE receipt_id = $1;", [receipt_id])
    .then(d => {
      if (d.rows.length >= 1){
        return res.json(d.rows);
      }
      return false
    })
    .catch(err => {
      console.log("ERROR from get'/reminders':", err)
    })
  })
  router.post('/', (req, res) => {
    const { receipt_id, date, alert_code } = req.body;
    db.query("INSERT INTO reminders(receipt_id, date, alert_code) VALUES($1, $2, $3) RETURNING *;", 
    [receipt_id, date, alert_code]
    ).then(d => {
      return console.log('TRACK reminders/POST:', d.rows);
    })
    .catch(err => {
      console.log('ERROR from POST/reminders:', err)
    })
  })

  router.post('/delete', (req, res) => {
    const { receipt_id } = req.body;
    db.query("DELETE FROM reminders WHERE id = $1;", 
    [receipt_id]
    ).then(d => {
      return console.log('d from reminders/delete/POST:', d);
    })
    .catch(err => {
      console.log('ERROR from POST/reminders/delete:', err)
    })
  })

  return router;
}