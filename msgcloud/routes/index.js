var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
  db.Customer.findAll().success(function(customers){
   console.log(customers);
   res.render('index', { title: 'Express',
                   customers: customers
              });
   });
});

module.exports = router;
