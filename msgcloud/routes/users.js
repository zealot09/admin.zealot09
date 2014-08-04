var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('add', function(req, res){
  res.json(s_ok);
});

module.exports = router;
