var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');
var marked = require('marked');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express Index'});
});

/* GET posts page. */
router.get('/posts', function(req, res, next){
    res.render('posts', { title: 'Posts'});
});

/* GET posts create page. */
router.get('/posts/create', function(req, res, next){
    res.render('create');
});

/* GET posts show page */
router.get('/posts/show', function(req, res, next){
    var id = req.query.id;

    PostModel.findOne({_id: id}, function(err, post) {
        post.content = marked(post.content);
        res.render('show', { post });
    });
});

/* GET posts edit page */
router.get('/posts/edit', function(req, res, next) {
    var id = req.query.id;

    res.render('edit', { id });
});

/* GET waterfall page. */
router.get('/waterfall_1', function (req, res, next) {
    res.render('waterfall_1', {
        title: '瀑布流布局-JS'
    });
});

router.get('/waterfall_2', function (req, res, next) {
    res.render('waterfall_2', {
        title: '瀑布流布局-JQuery'
    });
});

router.get('/waterfall_3', function (req, res, next) {
    res.render('waterfall_3', {
        title: '瀑布流布局-CSS'
    })
});

module.exports = router;