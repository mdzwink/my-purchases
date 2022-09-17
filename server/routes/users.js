const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query("SELECT * FROM users")
      .then(d => {
        res.json(d.rows);
      });
  });
  
  return router;
};
