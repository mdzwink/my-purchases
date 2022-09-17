const router = require('express').Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    const { email } = req.query;
    db.query("SELECT * FROM users WHERE email = $1;", [email])
      .then(d => {
        //if email exists then query should return an object at d.rows[0]. Therefore the following will evaluate as true and send a response of true. That is to say that the emailIsTaken
        if (d.rows[0]) {
          return res.json(true);
        }
        return res.json(false);
      })
      .catch(err => {
        return console.log("ERROR from post'/emailIsTaken':", err)
      })
  });

  return router;
}