var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  // res.send('This is a user routes with nodemon');
  res.json(
    {
      name:"Professor name",
      college:"Islington College",
      tech:["JS","Node","Express"]
    }
  );
});

module.exports = router;
