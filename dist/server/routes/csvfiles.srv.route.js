"use strict";
var csvfiles_srv_ctrl_1 = require('../ctrl/csvfiles.srv.ctrl');
function default_1(app) {
    var csvFilesCtrl = new csvfiles_srv_ctrl_1.default();
    app.route('/restapi/csv/getlines')
        .get(function (req, res) { csvFilesCtrl.readLines(req, res); });
    app.route('/restapi/csv/getnames')
        .get(function (req, res) { csvFilesCtrl.listNames(req, res); });
    app.route('/restapi/csv/defaultpath')
        .get(function (req, res) { csvFilesCtrl.getDefaultPath(req, res); });
    app.route('/restapi/csv/delete/:fileName')
        .delete(function (req, res) { csvFilesCtrl.deleteFile(req, res); });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
