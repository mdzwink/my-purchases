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
  
  return router;
};
