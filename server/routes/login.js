const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    const { email } = req.query;
    db.query("SELECT * FROM users WHERE email = $1;", [email])
      .then(d => {
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