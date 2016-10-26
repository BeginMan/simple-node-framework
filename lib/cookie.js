/**
 * Created by fangpeng on 16/10/26.
 */
// 解析Cookie
var parseCookie = function (cookie) {
    var cookies = {};
    if (!cookie) {
        return cookies
    }
    try {
        cookie.split(';')
            .map(function (e) {
                var ky = e.split('=');
                if (ky.length == 2) {
                    cookies[ky[0].trim()] = decodeURI(ky[1].trim());
                }
            });
    } catch (e) {
        // log
        console.log("解析cookie异常:", e);
    }
    return cookies;
};

// 序列化Cookie
var serialize = function (name, val, opt) {
    var pairs = [name + '=' + encodeURI(val)];
    opt = opt || {};

    if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
    if (opt.domain) pairs.push('Domain=' + opt.domain);
    if (opt.path) pairs.push('Path=' + opt.path);
    if (opt.expires) pairs.push('Expires=' + opt.expires);
    if (opt.httpOnly) pairs.push('HttpOnly');
    if (opt.secure) pairs.push('Secure');
    return pairs.join(";");
};

exports.parseCookie = parseCookie;
exports.serialize = serialize;

