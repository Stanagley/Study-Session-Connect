/*var express = require('express');
var router = express.Router();

/* GET users listing. *
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;*/

var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.json([{
    id: 1,
    name: "Hiccup",
    password: 'hiccup'
  }, {
    id: 2,
    name: "King Arthur",
    password: 'king-arthur'
  }]);
  // res.send('respond with a resource');
  
});
module.exports = router;