"use strict";
var readEachLine = require('read-each-line');
var csvUploadCtrl = (function () {
    function csvUploadCtrl() {
    }
    csvUploadCtrl.prototype.uploadSample = function (req, res) {
        var tmp_path = req.file.path;
        var firstlines = [], maxlines = 15, linenumber = 0;
        readEachLine(tmp_path, 'utf8', function (line) {
            if (++linenumber <= maxlines) {
                firstlines.push(line);
            }
        });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(firstlines));
    };
    csvUploadCtrl.prototype.uploadCsv = function (req, res) {
        var tmp_path = req.file.path;
        var origName = req.file.originalname;
        res.writeHead(200, { "Content-Type": "application/json" });
        var status = { status: "ok" };
        res.end(JSON.stringify(status));
    };
    return csvUploadCtrl;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = csvUploadCtrl;
