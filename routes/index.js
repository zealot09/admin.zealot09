var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
  db.Customer.findAll().success(function(customers){
  // console.log(customers);
   var sitenode = [{ Id : "Home", Text : "首页", Icon: "navigator" },
		   {Id: "Administrators", Text: "管理员账户", Icon: "navigator"},
		  {Id: "AdministratorRoles", Text: "管理员角色", Icon: "navigator"},
		  { Id: "AppDomains", Text: "应用域设置", Icon: "navigator"}
	];
   res.render('index', { CurrentUser: 'test',
			 SiteNodeMap: sitenode
              });
   });
});

module.exports = router;
