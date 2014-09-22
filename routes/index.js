var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
//   db.Customer.findAll().success(function(customers){
   var sitenode = [
       { Id : "Home", Text : "Home Page", Icon: "navigator" },
	   {Id: "Posts", Text: "Post Management", Icon: "navigator"},
	   {Id: "Categories", Text: "Category Management", Icon: "navigator"},
	   { Id: "Comment", Text: "Comment Management", Icon: "navigator"}
	];
	
   res.render('index', 
            { CurrentUser: 'test',
			     SiteNodeMap: sitenode
            });
//   });
});

module.exports = router;