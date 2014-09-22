var express = require('express');
var router = express.Router();
var db = require('../models');

/*
 *define the relationship between the post and category
 */
 

/* GET category listing. */
router.get('/', function(req, res) {
    db.Category.findAll().success(function(categories){
        console.log(categories);
        res.send('show all categories');
    });
});

router.post('/loader', function(req, res){
  res.json('s_ok');
});

router.post('/add', function(req, res) {
    
});

module.exports = router;