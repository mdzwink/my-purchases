const router = require('express').Router();

const users = ['Abdul', 'Sana', 'Jasmin', 'Autumn', 'Bilal'];

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query("SELECT * FROM users")
      .then(d => {
        res.json(d.rows);
      });
  });
  
  return router;
};
