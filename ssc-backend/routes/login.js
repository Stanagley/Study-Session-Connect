/*var express = require('express');
var router = express.Router();
/* GET users listing. *
router.post('/', function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.json({requestBody: req.body});
    res.send("success");
});

module.exports = router;*/

var express = require('express');
var router = express.Router();

// router.use(express.bodyParser());

router.post('/', function(req, res){
    res.set('Access-Control-Allow-Origin', '*');
    console.log(req.body);
    res.json(req.body);
    // res.send("test");
}); 

module.exports = router;