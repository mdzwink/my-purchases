const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    const { email, password } = req.body;
    db.query(`SELECT * FROM users;`)
      .then(d => {
        console.log('Select user>>>', d);
      })
      .catch(err => {
        console.log(err);
      });
  });

  return router;
}