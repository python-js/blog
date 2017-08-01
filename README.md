nodeJs + express + MySql 实现的个人博客

## session 工作流程：
+ 服务器是无状态的;如果不通过相应的技术处理，每次客户端发过来的请求，服务器都会进行响应处理
+ 通过服务器的session技术，可以实现用户的登录状态判断
+ 客户端发送过来的信息，服务器接收后，通过session技术，在内存中开辟一个空间，将信息进行存储，然后再生成一个密匙，
  将生成的密匙存储在cookie中，一起响应给客户端;当客户端再次向服务器发送请求时，

## 什么时session？
+ session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而session保存在服务器上。

+ 客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上，这就是session。客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了。

+ 如果说Cookie机制是通过检查客户身上的“通行证”来确定客户身份的话，那么session机制就是通过检查服务器上的“客户明细表”来确认客户身份。

+ session相当于程序在服务器上建立的一份客户档案，客户来访的时候只需要查询客户档案表就可以了。

两者的区别：

+ cookie数据存放在客户的浏览器上，session数据放在服务器上。
+ cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗 考虑到安全应当使用session。
+ session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能 考虑到减轻服务器性能方面，应当使用COOKIE。
单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。
+ 所以建议：将登陆信息等重要信息存放为session、其他信息如果需要保留，可以放在cookie中

## session 的简单应用和参数配置
+ 跟cookie一样都需要单独的安装和引用模块， 安装模块：$sudo npm install express-session 主要的方法就是 session(options)，其中 options 中包含可选参数，主要有：

+ name: 设置 cookie 中，保存 session 的字段名称，默认为 connect.sid 。
+ store: session 的存储方式，默认存放在内存中，也可以使用 redis，mongodb 等。express 生态中都有相应模块的支持。
+ secret: 通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
+ cookie: 设置存放 session id 的 cookie 的相关选项，默认为 (default: { path: '/’, httpOnly: true, secure: false, maxAge: null })
+ genid: 产生一个新的 session_id 时，所使用的函数， 默认使用 uid2 这个 npm 包。
+ rolling: 每个请求都重新设置一个 cookie，默认为 false。
+ resave: 即使 session 没有被修改，也保存 session 值，默认为 true。

## 数据库中插入一条数据后，返回的results内容
  OkPacket {
    fieldCount: 0,
    affectedRows: 1, // 影响条数
    insertId: 4, // 插入数据库中的id值
    serverStatus: 2,
    warningCount: 0,
    message: '',
    protocol41: true,
    changedRows: 0 }

## 数据库中两个表匹配查找时，返回的results 内容
    [ 
      [ 
        RowDataPacket {
          id: 3,
          title: '自我介绍',
          content: '我叫叼咋天',
          authorId: 2,
          ctime: 2017-07-30T10:01:40.000Z,
          nickname: '屌炸天' },
        RowDataPacket {
          id: 2,
          title: '第二篇',
          content: '<h1>天气真是热<h1>\n<br>\nhaha ',
          authorId: 1,
          ctime: 2017-07-30T10:00:12.000Z,
          nickname: '迪奥' } 
      ],
      [ 
        RowDataPacket { totalCount: 3 } 
      ] 
    ]