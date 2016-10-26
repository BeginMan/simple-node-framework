# 基于Cookie来实现Session映射

参考《深入浅出Node.js》 8.1.5

Cookie的缺点:

- 体积限制
- 体积过大,影响请求
- 安全性差,易篡改和伪造


为解决上述问题,Session开始应用, Session数据只保留服务端, 客户端无法修改和伪造, 数据安全性有一定的保障.

工作原理就是: 如何将每个客户和服务器中的数据一一对应起来, 常见的两种方式:

1. 基于Cookie来实现用户和数据的映射.
2. 通过查询字符串来实现浏览器和服务器数据的对应.

## 1. 基于Cookie来实现用户和数据的映射.

将口令放在Cookie中, 敏感数据放在session里. 口令一旦被篡改, 就丢失了映射关系, 也无法修改服务器端存在的数据了.并且session的有效期
通常较短, 如20分钟,如果在20分钟内客户端和服务端没有交互则服务器端就将数据删掉.由于数据过期时间较短,且在服务器端存储数据,因此安全性相对较高.

对于口令的生成, 服务器约定一个键值作为session的口令, 比如 sid, 这个键值要保证其唯一性, 如果还要附加一些信息也可进行加密等处理,并且设置
超时时间.

这里我们将session存储在内存里, 一旦服务器重启则内存数据丢失, 这里暂时就不放在redis,memcached等工具里.

对session格式的约定如下:

    // 为每个请求建立session, 并挂载到req下, 如 req.session = session;
    var session = { sid: 'Ao7cV..', cookie: { expire: 1477492494564 } };
    // 将sid 作为key ,session 作为value 存储在Session集里
    sessions = { 'Ao7cV..': , ... }

    // 用户增删session, 无非就是增删session对象字段, 如 req.session.otherValue = ....


对于Cookie则处理如下:

    // 解析请求附加的cookie, 如果有sid则 检查 sid的值是否映射sessions
    // if ( sessions[req.cookie.sid]) {... // 处理后续工作, 更新session过期时间}
    // 如果不存在则建立session, 并生成名为sid的Cookie保存在客户端.


第一次请求是: http://localhost:5000/index/index/admin 页面返回 hi~ welcome!, 第二次请求则检查到session对应的约定键值, 则显示 :D, welcome again!


## 使用

使用说明:

    git clone https://github.com/BeginMan/simple-node-framework.git snf
    cd snf
    node app.js

