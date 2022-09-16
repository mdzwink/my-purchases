const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    const { email } = req.query;
    db.query("SELECT * FROM users WHERE email = $1;", [email])
      .then(d => {
        //if email exists then query should return an object at d.rows[0]. Therefore the following will evaluate as true and send a response of false. That is to say that the emailIs(not)Taken
        if (d.rows[0]) {
          return res.json(false)
        }
        return res.json(true);
      })
      .catch(err => {
        return console.log("ERROR from post'/emailIsTaken':", err)
      })
  });

  return router;
}