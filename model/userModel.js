var connection = require('./baseDB.js');

module.exports = {
    getUserByname(name, callback){ //获取数据库中的指定信息
        var sqlStr = 'select * from user where username=?';
        connection.query(sqlStr, name, (err, results) => {
            if(err) return callback(err);
            callback(null, results);
        })
    },
    registerNewUser(info, callback){ //插入数据
        var sqlStr = 'insert into user set ?';
        connection.query(sqlStr, info, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        })
    },
    userLogin(user, callback){ // 登录数据匹配
        var sqlStr = 'select * from user where username=? and password=?';
        connection.query(sqlStr,[user.username, user.password], (err, results) => {
            if (err) return callback(err);
            // console.log(results);
            return callback(null, results);
        })
    }
}