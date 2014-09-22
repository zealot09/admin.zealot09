var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET users listing. */
router.get('/', function(req, res) {
    db.Post.findAll().success(function(posts){
        console.log(posts);
        res.send('show all posts');
    });
});

router.post('/loader', function(req, res){
  res.json('s_ok');
});

module.exports = router;