const router = require('express').Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer();

module.exports = (db) => {
  router.post('/', upload.none(), (req, res) => {
    // const { test } = req.body;
    const x = req.body.formData
    console.log(x)
    
    res.send(req.body)
  })

  return router;
}