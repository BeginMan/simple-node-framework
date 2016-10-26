/**
 * Created by fangpeng on 16/10/26.
 */
var handles = {};
var cookie = require('../lib/cookie');

handles.index = {};
handles.index.index = function (req, res, foo, bar) {
    if (!req.session.isVisit) {
        req.session.isVisit = true;
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end('Hi~, welcome!');
    } else {
        res.setHeader('Set-Cookie', cookie.serialize('name', foo, {maxAge:3600*100}));
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end(':D, welcome again!');
    }
};

exports.handles = handles;


