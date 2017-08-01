//入口文件
var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

//配置默认模板引擎
app.set('view engine','ejs');
//设置默认模板页面的存放路径
app.set('views','./views');

//托管静态资源
app.use('/node_modules',express.static('./node_modules'))

// 注册 body-parser 中间件 这个中间件必须放在路由注册的上面
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended:false }));

//注册 session 中间件 //存储用户信息，判断用户登录状态
var session = require('express-session');
app.use(session({
    secret: '这是加密字符串，随便写！', // 用来生成加密的内容
    resave: false,
    saveUninitialized: false
}));


// //导入首页路由模块
// var indexRoute = require('./router/indexRoute.js');
// //使用use注册路由
// app.use(indexRoute);

// var userRouter = require('./router/userRouter.js');
// app.use(userRouter);

//使用 fs.readdir 读取存放路由管理的文件，遍历文件，循环注册每一个路由模块
fs.readdir(path.join(__dirname, './router'), (err, results) => {
    // console.log(results);
    results.forEach( filename => {
        fileDir = path.join(__dirname, './router', filename);
        app.use(require(fileDir));
    } )
})


app.listen(3004, ()=>{
    console.log('http://127.0.0.1:3004');
});
