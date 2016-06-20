"use strict";
var readEachLine = require("read-each-line");
var multer = require("multer");
var CsvUploadCtrl = (function () {
    function CsvUploadCtrl() {
    }
    CsvUploadCtrl.prototype.fileFilter = function (req, file, cb) {
        if (file.originalname.indexOf(".csv") === file.originalname.length - 4) {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    };
    CsvUploadCtrl.prototype.getMulterMiddleware = function (dest, useOrginalFileName) {
        var storageOptions = {
            destination: function (req, file, cb) {
                cb(null, dest);
            }
        };
        if (useOrginalFileName) {
            storageOptions.filename = function (req, file, cb) {
                var suffix = "-" + Date.now() + ".csv";
                cb(null, file.originalname.substring(0, file.originalname.length - 4) + suffix);
            };
        }
        var storage = multer.diskStorage(storageOptions);
        var multerConfig = multer({ storage: storage, fileFilter: this.fileFilter });
        return multerConfig.single("csvfile");
    };
    CsvUploadCtrl.prototype.uploadSample = function (req, res) {
        var tmp_path = req.file.path;
        var firstlines = [], maxlines = 15, linenumber = 0;
        readEachLine(tmp_path, "utf8", function (line) {
            if (++linenumber <= maxlines) {
                firstlines.push(line);
            }
        });
        res.json(firstlines);
    };
    CsvUploadCtrl.prototype.uploadCsv = function (req, res) {
        var response = { status: "ok", fileName: req.file.filename };
        res.json(response);
    };
    return CsvUploadCtrl;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CsvUploadCtrl;
//# sourceMappingURL=csvupload.srv.ctrl.js.map