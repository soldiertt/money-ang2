"use strict";
var csvupload_srv_ctrl_1 = require("../ctrl/csvupload.srv.ctrl");
function default_1(app) {
    var csvUploadCtrl = new csvupload_srv_ctrl_1.default();
    app.route("/uploadsample")
        .post(csvUploadCtrl.getMulterMiddleware("uploads/sample", false), function (req, res) { csvUploadCtrl.uploadSample(req, res); });
    app.route("/uploadcsv")
        .post(csvUploadCtrl.getMulterMiddleware("uploads/csv", true), function (req, res) { csvUploadCtrl.uploadCsv(req, res); });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
