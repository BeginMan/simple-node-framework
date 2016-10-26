/**
 * Created by fangpeng on 16/10/26.
 */

var sessions = {};
/*
    sessions = { 'Ao7cV..': { sid: 'Ao7cV..', cookie: { expire: 1477492494564 } }, ... }
    以唯一值做key,映射session
 */
var key = 'sid';
var EXPIRES = 20 * 60 *1000;        // 20min

var generate = function () {
    var session = {};
    session.sid = (new Date()).getTime() + Math.random();
    session.cookie = {
        expire: (new Date()).getTime() + EXPIRES
    };
    sessions[session.sid] = session;
    return session;
};

// valid cookie
var valid = function (req) {
    var sid = req.cookie[key];     // 检查cookie里是否有sid
    if (!sid) {
        req.session = generate();
    } else {
        var session = sessions[sid];
        if (session) {
            if (session.cookie.expire > (new Date()).getTime()) {
                // update expire time
                session.cookie.expire = (new Date()).getTime() + EXPIRES;
                req.session = session;
            } else {
                // remove old session and generate new session for this request when it is expired.
                delete sessions[sid];
                req.session = generate();
            }
        } else {
            // 如果session过期或口令不对,重新生成
            req.session = generate();
        }
    }
};


exports.valid = valid;