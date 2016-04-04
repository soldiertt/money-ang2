"use strict";
var readEachLine = require('read-each-line');
var multer = require('multer');
var csvUploadCtrl = (function () {
    function csvUploadCtrl() {
    }
    csvUploadCtrl.prototype.fileFilter = function (req, file, cb) {
        console.log("filter");
        if (file.originalname.indexOf(".csv") == file.originalname.length - 4) {
            console.log("filterOK");
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    };
    csvUploadCtrl.prototype.getMulterMiddleware = function (dest, useOrginalFileName) {
        var storageOptions = {
            destination: function (req, file, cb) {
                cb(null, dest);
            }
        };
        if (useOrginalFileName) {
            storageOptions.filename = function (req, file, cb) {
                var suffix = '-' + Date.now() + '.csv';
                cb(null, file.originalname.substring(0, file.originalname.length - 4) + suffix);
            };
        }
        var storage = multer.diskStorage(storageOptions);
        var multerConfig = multer({ storage: storage, fileFilter: this.fileFilter });
        return multerConfig.single('csvfile');
    };
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
