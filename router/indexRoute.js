//首页路由跳转模块

var express = require('express');

var router = express.Router();

//导入首页控制模块
var indexCtrl = require('../controller/indexCtrl');

router
    .get('/',indexCtrl.showIndexPage);


module.exports = router;