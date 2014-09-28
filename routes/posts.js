var express = require('express');
var _ = require("underscore");
var Promise = require("bluebird");
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
    db.Category.findAll().success(function(categories) {
        db.Post.findAll().success(function(posts){
            var processedPosts = _.map(posts, function(post) {
                post.Category = _.find(categories, function(ct) {
                    return ct.Id = post.CategoryId;
                }).Name;
                return post;
            });
            
            console.log(processedPosts);
            res.json({
                status: 'ok',
                data: processedPosts
            });
        });    
    });
});

router.post('/create', function(req, res) {
    var name = req.body.name, title = req.body.title, content = req.body.content, categoryId = req.body.categoryId;
     db.Category.findAll({
        where: {
            Id: categoryId
        }
    }).success(function(categories) {
        if(categories.length === 1){
        var post = db.Post.build({
                Name: name,
                Title: title,
                Content: content,
                CategoryId: categoryId,
                CreateAt: new Date(),
                UpdateAt: new Date()
            });
            post.save().success(function() {
               res.json('s_ok'); 
            }).error(function() {
                res.json('e_error');
            });
        }else{
            res.json('e_category_not_find');
        }    
    });
    res.json('s_ok');
})

router.post('delete', function(req, res) {
    var id = req.body.id;
    db.Post.findAll({
        where: {
            Id:id
        }
    }).success(function(posts) {
        if(posts.length === 0){
            res.json('can\'t find post');
        }else {
            posts[0].destroy().success(function() {
                res.json('s_ok');
            });
        }
    });    
});

module.exports = router;