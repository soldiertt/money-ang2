"use strict";
var fs = require("fs");
var path = require("path");
var readEachLine = require("read-each-line");
var CsvFilesCtrl = (function () {
    function CsvFilesCtrl() {
    }
    CsvFilesCtrl.prototype.readLines = function (req, res) {
        var rootPath = this.getRootPath(req), startsWith = req.query.startsWith, headerLinesCount = req.query.headerLinesCount, csvLines = [];
        fs.readdir(rootPath, function (err, files) {
            if (err)
                throw err;
            files.forEach(function (name) {
                var filePath = path.join(rootPath, name);
                var stat = fs.statSync(filePath);
                if (stat.isFile() && name.indexOf(startsWith) === 0 && name.indexOf(".csv") === (name.length - 4)) {
                    console.log("reading", filePath);
                    var linenumber_1 = 0;
                    readEachLine(filePath, "utf8", function (line) {
                        if (++linenumber_1 > headerLinesCount) {
                            csvLines.push(line);
                        }
                    });
                }
            });
            res.json(csvLines);
        });
    };
    CsvFilesCtrl.prototype.listNames = function (req, res) {
        var rootPath = this.getRootPath(req), fileNames = [];
        fs.readdir(rootPath, function (err, files) {
            if (err)
                throw err;
            files.forEach(function (name) {
                var filePath = path.join(rootPath, name);
                var stat = fs.statSync(filePath);
                if (stat.isFile() && name.indexOf(".csv") === (name.length - 4)) {
                    fileNames.push(name);
                }
            });
            res.json(fileNames);
        });
    };
    CsvFilesCtrl.prototype.getDefaultPath = function (req, res) {
        var response = { path: fs.realpathSync("uploads/csv/") };
        res.json(response);
    };
    CsvFilesCtrl.prototype.deleteFile = function (req, res) {
        var fileName = req.params.fileName;
        var rootPath = fs.realpathSync("uploads/csv/");
        fs.unlink(path.join(rootPath, fileName), function () {
            console.log("File deleted", fileName);
        });
        var response = { status: "ok" };
        res.json(response);
    };
    CsvFilesCtrl.prototype.getRootPath = function (req) {
        var rootPath = req.query.rootPath;
        if (!rootPath) {
            rootPath = fs.realpathSync("uploads/csv/");
        }
        return rootPath;
    };
    return CsvFilesCtrl;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CsvFilesCtrl;
//# sourceMappingURL=csvfiles.srv.ctrl.js.map