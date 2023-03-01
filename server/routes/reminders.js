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
      throw new Error(err)
    })
  })
  router.post('/', (req) => {
    const { receipt_id, date } = req.body;
    db.query("INSERT INTO reminders(receipt_id, date) VALUES($1, $2) RETURNING *;", 
    [receipt_id, date]
    ).then(d => {
      res.json(req.body)
    })
    .catch(err => {
      throw new Error(err)
    })
  })

  router.post('/delete', (req) => {
    const { reminder_id } = req.body;
    db.query("DELETE FROM reminders WHERE id = $1;", [reminder_id])
    .then(d => {
      console.log('reminder deleted', d)
    })
    .catch(err => {
      throw new Error(err)
    })
  })

  return router;
}