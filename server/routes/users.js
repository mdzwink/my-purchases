const router = require('express').Router();

const users = ['Abdul', 'Sana', 'Jasmin', 'Autumn', 'Bilal'];

module.exports = (db) => {
  router.get('/', (req, res) => {
    res.json(users);
  })
  
  return router;
}
