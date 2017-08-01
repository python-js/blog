
var connection = require('./baseDB.js');

var moment = require('moment');

module.exports = {
    addArticle(article, callback){
        var sqlStr = 'insert into articles set ?';
        connection.query(sqlStr, article, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    getArticleById(id, callback){
        var sqlStr = 'select articles.*, user.nickname from articles LEFT JOIN user ON articles.authorId=user.id where articles.id=?';

        connection.query(sqlStr, id, (err, results) => {
            if(err) return callback(err);
            
            results.forEach(article => {
                article.ctime = moment(article).format('YYYY-MM-DD HH:mm:ss');
            });
            // console.log(results);
            callback(null, results);
        });
    },
    editArticle(article, callback){
        var sqlStr = 'update articles set ? where id=?';
        connection.query(sqlStr, [article, article.id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        })
    },
    getArticlesByPage(nowPage, pageSize, callback) { // 先获取所有的文章列表，然后在改造成 获取分页
    // var sqlStr = 'select articles.*, users.nickname from articles left join users on articles.authorId=users.id order by ctime desc';
    // 偏移量的算法：  (当前页码值 - 1) * 每页显示几条数据
    var offset = (nowPage - 1) * pageSize;

    var sqlStr = 'select articles.*, user.nickname from articles left join user on articles.authorId=user.id order by ctime desc LIMIT ?, ?; select count(*) AS totalCount from articles;';
    connection.query(sqlStr, [offset, pageSize], (err, results) => {
      if (err) return callback(err);
      console.log(results);
      // 循环文章列表处理时间
      results[0].forEach(item => {
        item.ctime = moment(item.ctime).fromNow();
      });
      callback(null, results);
    });
  }
}