var express = require('express');
var router = express.Router();
var db = require('../models');

/*
 *define the relationship between the post and category
 */

/* GET category listing. */
// router.get('/', function(req, res) {
//     db.Category.findAll().success(function(categories){
//         console.log(categories);
//         res.send(categories.toString());
//     });
// });

router.post('/loader', function(req, res){
    db.Category.findAll().success(function(categories){
        res.json({
            status: 'ok',
            data: categories
        });
    });    
});

/**
 *Think how to avoid xss attack using express or others
 * 
 */
router.post('/create', function(req, res) {
    var name = req.body.name;
    // console.log(name);
    db.Category.findAll({
        where: {
            Name: name
        }
    }).success(function(cats) {
        // console.log(cats.length);
        if(cats.length === 0) {
            var category = db.Category.build({
                Name: name,
                Amount: 0,
                CreateAt: new Date(),
                UpdateAt: new Date()
            });
            category.save().success(function() {
               res.json('s_ok'); 
            }).error(function() {
                res.json('e_error');
            });
            res.json('s_ok');
        }else {
            res.json('e_duplicate_name');
        }
    });
});

router.post('/delete', function(req, res) {
    var id = req.body.id;
    db.Category.findAll({
        where: {
            Id:id
        }
    }).success(function(categories) {
        if(categories.length === 0){
            res.json('can\'t find record');
        }else {
            categories[0].destroy().success(function() {
                res.json('s_ok');
            });
        }
    });
});

module.exports = router;