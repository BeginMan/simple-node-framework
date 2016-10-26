var http = require('http');
var url = require('url');
var cookie = require('./lib/cookie');
var session = require('./lib/session');

var indexHandle = require('./routes/index').handles;
var fileHandle = require('./routes/file').handles;
//控制器-动作集
var handles = Object.assign(indexHandle, fileHandle);

http.createServer(function (req, res) {
    if (req.url == '/favicon.ico') {
        res.writeHead(200);
        return res.end('~');
    }
    // 解析cookie挂载到req下
    req.cookie = cookie.parseCookie(req.headers.cookie);
    // 处理session挂载到req下
    session.valid(req);

    // hack writeHead
    var writeHead = res.writeHead;
    res.writeHead = function () {
        var rCookie = res.getHeader('Set-Cookie');
        var rSession = cookie.serialize('sid', req.session.sid);
        rCookie = Array.isArray(rCookie) ? rCookie.concat(rSession): [rCookie, rSession];
        res.setHeader('Set-Cookie', rCookie);
        return writeHead.apply(this, arguments);
    };

    // 处理请求路由分发
    var pathName = url.parse(req.url).pathname;
    var paths = pathName.split('/');
    var controller = paths[1] || 'index';        // 控制器
    var action = paths[2] || 'index';           // 动作
    var args = paths.slice(3);                  // 参数
    if (handles[controller] && handles[controller][action]) {
        handles[controller][action].apply(null, [req, res].concat(args));
    } else {
        res.writeHead(500);
        res.end("Can't found controller.");
    }

}).listen(5000, '127.0.0.1');

