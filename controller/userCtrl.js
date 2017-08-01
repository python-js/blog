//用户操作功能，控制管理模块
var md5 = require('blueimp-md5'); // 进行MD5加密的第三方包
var pwdSalt = require('../config.js');
//引入用户功能模块
var userModel = require('../model/userModel.js');

module.exports = {
    showRegisterPage(req,res) { //显示注册页面
        res.render('./user/register',{});
    },
    reqisterNewUser(req, res) { //注册新用户
        //使用中间件，req.body 能将用户传入过来的信息 转换成对象的格式
        // console.log(req.body);
        user = req.body;
        // console.log(user.username);
        //注册之前，需要先判断该用户名，是否已经存在了。
        userModel.getUserByname(user.username, (err, results) => {
            // console.log(results);
            if(err) return res.json({ err_code:1, msg:'注册失败' });
            // 判断查询出来的结果，length 如果 等于 0 ，表示 此用户名可用
            if(results.length !== 0) return res.json({ err_code:1, msg:'此用户名已存在' });

            // 为了提高密码的安全性，我们需要在 注册新用户之前，先把 用户的密码进行 MD5 加密
            // 在调用 md5() 方法加密的时候，使用两个参数：第一个是用户输的密码；第二个参数是：程序执行的提高安全性的盐
            user.password = md5(user.password,pwdSalt.passwordSalt)
            userModel.registerNewUser(user, (err, results) => {
                if (err) return res.json({ err_code:1, msg:'注册失败' });
                //如果插入数据的影响行数不等于1;注册也是失败的
                if (results.affectedRows !== 1) return res.json({ err_code:1, msg:'注册失败' });
                return res.json({ err_code:0, msg: "注册成功" });
            })
        })
    },
    showLoginPage(req,res){ //显示登录页
        res.render('./user/login',{});
    },
    login(req, res){ //用户登录
        var user = req.body;
        //在数据库中查找该用户名和密码，如果存在，则登录成功
        //给相同的内容进行md5加密时，加密出来的结果是相同的
        //用户注册时，使用md5加密后，数据库中存储的就是加密后的密码，用户登录时输入的内容也要先进行加密，再与数据库中存储的密码进行比对，否则是无法匹配成功的
        user.password = md5(user.password,pwdSalt.passwordSalt)
        userModel.userLogin(user,(err, results) => {
            if (err) return res.json({ err_code:1, msg:'登陆失败'});

            //在返回登录成功之前，先把登录的状态 和 登录用户的数据， 保存到 session 中
            // console.log(req.session);
            //当注册 session 中间件 ok之后，只要你能访问到 req 这个对象， 那么就能访问到 req.session
            req.session.islogin = true;
            req.session.user = results[0];

            // console.log(req.session);


            return res.json({ err_code:0, msg:"登陆成功" });
            
        })
    },
    logout(req,res){ //注销登录
        // 分析：登录状态的保持，是通过 Session 技术实现的； 是直接 调用 req.session.*** 来保存的
        /* req.session.islogin = null;
        req.session.user = null; */
        //注销session信息的方法 req.session.destroy(err=>{})
        req.session.destroy((err) => {
            if(err) { //注销失败
                console.log('注销失败');
                res.redirect('/'); //路由重定向到根目录
                return;
            }
            console.log('注销成功');
            res.redirect('/');
        })
    }
}