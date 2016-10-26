/**
 * Created by fangpeng on 16/10/26.
 */
var fs = require('fs');
var path = require('path');
var ROOT = path.join(path.dirname(__filename), '../');

var handles = {};

handles.file = {};
handles.file.get = function (req, res, fileName) {
    fs.readFile(path.join(ROOT, fileName), function (err, file) {
        if (err) {
            res.writeHead(404);
            res.end("Can't found file");
            return;
        }
        res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        res.end(file);
    });
};

exports.handles = handles;
