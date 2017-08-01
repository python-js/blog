
var express = require('express');

var render = express.Router();

var articleCtrl = require('../controller/articleCtrl.js');

render
    .get('/article/add',articleCtrl.showArticleAddPage)
    .post('/article/add',articleCtrl.addArticle)
    .get('/article/info',articleCtrl.showArticleInfoPage)
    .get('/article/edit',articleCtrl.editArticlePage)
    .post('/article/edit',articleCtrl.editArticle)

module.exports = render;