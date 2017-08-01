var mysql = require('mysql');

var connection = mysql.createConnection({ //创建一个数据库
    host:'127.0.0.1', //主机地址
    user: 'root', //用户名
    password: 'root', //密码
    database: 'blog', // 数据库名称
    multipleStatements: true //开启执行多条语句的功能
});

module.exports = connection;