
var articleModel = require('../model/articleModel.js');
var mditor = require('mditor');

module.exports = {
    showArticleAddPage(req, res) {
        if(!req.session.islogin) return res.redirect('/login');

        res.render('./article/add',{
            islogin: req.session.islogin,
            user: req.session.user
        });
    },
    addArticle(req, res) {
        // console.log(typeof req.body);
        var article = req.body; //获取用户出入过来的数据
        article.ctime = new Date();
        articleModel.addArticle(article, (err, results) => {
            //如果发送错误，则返回失败的结果
            if(err) return res.json({err_code:1, msg: '发表文章失败'});
            //如果 数据库中影响的条数 不等于 1条，则返回发表失败的结果
            if(results.affectedRows !== 1) return res.json({ err_code: 1, msg:'发表文章失败' });
            //发表 ok，并将 文章的ID 返回给用户
            // console.log(results);
            res.json({err_code:0, msg:'发表成功',id: results.insertId}); //此ID为文章在数据库中的id值

        })

    },
    showArticleInfoPage(req, res) {
        //如果用户没有登录，那么返回登录界面
        if (!req.session.islogin) return res.redirect('/login');
        //获取，文章的id值
        var id = req.query.id;
        // console.log(req.query); //这个可以拿到路由 后面的参数
        // console.log(req.url);
        // console.log(req.session); //获取用户的登录信息
        //通过文章的id值，获取到该文章在数据库中的内容
        articleModel.getArticleById(id, (err, results) => {
            if(err) return res.redirect('/'); //重定向
            if(results.length !== 1) return res.redirect('/');
            // console.log(results[0].nickname);
            //创建一个把 markdown 格式解析为HTML格式的对象
            var parser = new mditor.Parser();
            //调用parser方法解析
            //var html = parser.parse("** Hello mditor! **")
            results[0].content = parser.parse(results[0].content);
            res.render('./article/info', {
                article: results[0],
                islogin: req.session.islogin,
                user: req.session.user
            });
        });
    },
    editArticlePage(req, res) {
        var id = req.query.id;
        // console.log(req.query);
        articleModel.getArticleById(id, (err, results) => {
            // 如果获取文章数据失败，则直接跳转到项目首页
            if (err) return res.redirect('/');
            if (results.length !== 1) return res.redirect('/');

            //在展示编辑页面之前，先要确保 登录人的ID 和 当前文章作者ID相同 才能渲染页面
            if(req.session.user.id !== results[0].authorId) return res.redirect('/');
            // console.log(req.session.user);
            //展示编辑页面
            res.render('./article/edit',{
                islogin: req.session.islogin,
                user: req.session.user,
                article: results[0]
            });
        });
    },
    editArticle(req, res) {
        var article = req.body;
        // console.log(article);
        articleModel.editArticle(article, (err, results) => {
            if (err || results.affectedRows !== 1) return res.json({ err_code: 1, msg: '编辑文章失败，请稍后再试！' });

            res.json({err_code : 0});
        })
    }
}