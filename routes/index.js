var express = require('express'), _ = require("underscore"), _s = require("underscore.string"), 
CryptoJS = require("crypto-js"),
moment = require("moment");
var app = express();
var router = express.Router();
var db = require('../models');

var EXPIRED = 7;

/* GET home page. */
router.get('/', function(req, res) {
   if(!req.session.currentUser){
        res.render('bglogin', {});    
   }else{
       var sitenode = [
        { Id : "Home", Text : "Home Page", Icon: "navigator" },
	    {Id: "Posts", Text: "Post", Icon: "navigator"},
	    {Id: "Categories", Text: "Category", Icon: "navigator"},
	    { Id: "Comment", Text: "Comment", Icon: "navigator"}
	    ];

       res.render('index', {
            SiteNodeMap: sitenode
       })
   }
});

router.post('/checkLogin', function(req, res) {
    var cn = req.cookies.cn, ctk = req.cookies.ctk, token = req.cookies.token;
    //console.log(cn + '-' + ctk + '-' + token);
    // if(app.get('currentUser')){
    if(req.session.currentUser){
        res.json({success: true});    
    }else {
        if (!cn || !ctk || !token){
            res.json({success: false, msg: 'You have disabled broswer cookie, please check it!'});
        } 
        // if (IsExpired(parseInt(ctk))) return null;
        db.Admin.findAll({
        where: {
            Account: cn
        }
        }).success(function(admins) {
            if(admins == null) res.json({success: false, msg: 'wrong password or user name!'});
            var manager = admins[0], cp = manager.Password;
            console.log(manager);
            console.log(cn + '-' + ctk + '-' + token);
            
            var cpthash = CryptoJS.MD5(manager.Account + ctk + cp).toString();
            console.log(StringXor(cp, cpthash));
            if(token === StringXor(cp, cpthash)) {
                // app.set("currentUser", {
                //     Account: manager.Account,
                //     Password: manager.Password,
                //     ContactPhone: manager.ContactPhone
                // });
                req.session.currentUser = manager.Account;
                res.json({success: true});
            }else{
                res.json({success: false, msg: 'wrong password or user name!'});
            }
        });
    }
});

var IsExpired = function(cookiems) {
    var btw = Expired * 24 * 60 * 60 * 1000;
    var curms = (new Date()).getTime();
    return curms - cookiems > btw ? true : false;
}

var hex = "0123456789abcdef";

var StringXor =  function (str, key) {
                var rs = "";
                for (var i = 0; i < str.length; i++) {
                    rs += hex[hex.indexOf(str[i]) ^ hex.indexOf(key[i])];
                }
                return rs;
            };

router.get('/index', function(req, res) {
    
});

module.exports = router;