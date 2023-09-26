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
    location: "heaven",
    major: 'geology',
    class: 'geo101',
    time: 'never'
  }, {
    id: 2,
    location: "hell",
    major: 'cs',
    class: 'rcass.in.my.mouth',
    time: 'always'
  }]);
  // res.send('respond with a resource');
  
});
module.exports = router;