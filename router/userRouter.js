//用户操作路由跳转模块

var express = require('express');

var router = express.Router();

//导入用户功能控制模块
var userCtrl = require('../controller/userCtrl.js');

router
 .get('/register',userCtrl.showRegisterPage)
 .post('/register',userCtrl.reqisterNewUser)
 .get('/login',userCtrl.showLoginPage)
 .post('/login', userCtrl.login)
 .get('/logout',userCtrl.logout)


module.exports = router;