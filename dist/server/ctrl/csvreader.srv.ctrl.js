"use strict";
var fs = require('fs');
var path = require('path');
var readEachLine = require('read-each-line');
var CsvFilesCtrl = (function () {
    function CsvFilesCtrl() {
    }
    CsvFilesCtrl.prototype.readLines = function (req, res) {
        var rootPath = req.query.rootPath, startsWith = req.query.startsWith, headerLinesCount = req.query.headerLinesCount, csvLines = [];
        fs.readdir(rootPath, function (err, files) {
            if (err)
                throw err;
            files.forEach(function (name) {
                var filePath = path.join(rootPath, name);
                var stat = fs.statSync(filePath);
                if (stat.isFile() && name.indexOf(startsWith) == 0 && name.indexOf(".csv") == (name.length - 4)) {
                    console.log("reading", filePath);
                    var linenumber_1 = 0;
                    readEachLine(filePath, 'utf8', function (line) {
                        if (++linenumber_1 > headerLinesCount) {
                            csvLines.push(line);
                        }
                    });
                }
            });
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(csvLines));
        });
    };
    CsvFilesCtrl.prototype.listNames = function (req, res) {
        var rootPath = req.query.rootPath, fileNames = [];
        if (!rootPath) {
            rootPath = fs.realpathSync('uploads/csv/');
        }
        fs.readdir(rootPath, function (err, files) {
            if (err)
                throw err;
            files.forEach(function (name) {
                var filePath = path.join(rootPath, name);
                var stat = fs.statSync(filePath);
                if (stat.isFile() && name.indexOf(".csv") == (name.length - 4)) {
                    fileNames.push(name);
                }
            });
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(fileNames));
        });
    };
    CsvFilesCtrl.prototype.deleteFile = function (req, res) {
    };
    return CsvFilesCtrl;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CsvFilesCtrl;
