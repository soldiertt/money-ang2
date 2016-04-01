"use strict";
var csvupload_srv_ctrl_1 = require('../ctrl/csvupload.srv.ctrl');
var multer = require('multer');
function default_1(app) {
    var upload = multer({ dest: 'uploads/' });
    var csvUploadCtrl = new csvupload_srv_ctrl_1.default();
    app.route('/upload')
        .post(upload.single('csvfile'), function (req, res) { csvUploadCtrl.upload(req, res); });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
