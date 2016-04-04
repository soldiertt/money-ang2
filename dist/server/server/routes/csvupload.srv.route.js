"use strict";
var csvupload_srv_ctrl_1 = require('../ctrl/csvupload.srv.ctrl');
var multer = require('multer');
function fileFilter(req, file, cb) {
    if (file.originalname.indexOf(".csv") == file.originalname.length - 4) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
function getMulterConfig(dest) {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dest);
        },
        filename: function (req, file, cb) {
            var suffix = '-' + Date.now() + '.csv';
            cb(null, file.originalname.substring(0, file.originalname.length - 5) + suffix);
        }
    });
    return multer({ storage: storage, fileFilter: fileFilter });
}
function default_1(app) {
    var uploadSample = getMulterConfig('uploads/sample');
    var uploadCsv = getMulterConfig('uploads/csv');
    var csvUploadCtrl = new csvupload_srv_ctrl_1.default();
    app.route('/uploadsample')
        .post(uploadSample.single('csvfile'), function (req, res) { csvUploadCtrl.uploadSample(req, res); });
    app.route('/uploadcsv')
        .post(uploadCsv.single('csvfile'), function (req, res) { csvUploadCtrl.uploadCsv(req, res); });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
