const router = require('express').Router();

module.exports = (db) => {
  router.get("/:receiptID", (req, res) => {
    const { receiptID } = req.params;
    console.log(receiptID)
    db.query("SELECT * FROM items WHERE receipt_id = $1;", [receiptID])
      .then(d => {
        return res.json(d.rows);
      })
      .catch(e => {
        console.log("Error from get'/items':", e)
      });
  });
  
  return router;
};
