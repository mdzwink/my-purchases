const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    const { email, password } = req.query;
    console.log('body from front>>>',req.query)
    db.query("SELECT * FROM users WHERE email = $1 AND password = $2;", [email, password])
      .then(d => {
        console.log('found user:',d.rows)
        if (d.rows.length > 0) {
          return res.json(d.rows);
        }
        return res.json(false)
      })
      .catch(err => {
        return console.log("ERROR from post'/login':", err)
      })
  });

  return router;
}