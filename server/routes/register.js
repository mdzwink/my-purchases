const router = require('express').Router();

module.exports = (db) => {
  router.post('/', (req, res) => {
    const { email, password } = req.body;
    db.query('INSERT INTO users (email, password) VALUES($1, $2) RETURNING *;', [email, password])
      .then(d => {
        return res.json(d.body);
      })
      .catch(err => {
        return console.log("ERROR from BACK post'/register':", err)
      })
  });

  return router;
}