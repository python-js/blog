//首页功能控制管理模块

module.exports = {
    showIndexPage(req,res){ //显示首页
        res.render('index',{
            islogin: req.session.islogin, // 从 session 中获取用户是否登录
            user: req.session.user // 从 session 中获取用户信息
        });
    }
}