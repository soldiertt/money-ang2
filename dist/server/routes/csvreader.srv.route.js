"use strict";
var csvfiles_srv_ctrl_1 = require('../ctrl/csvfiles.srv.ctrl');
function default_1(app) {
    var csvReaderCtrl = new csvfiles_srv_ctrl_1.default();
    app.route('/restapi/csv/getlines')
        .get(function (req, res) { csvReaderCtrl.readLines(req, res); });
    app.route('/restapi/csv/getnames')
        .get(function (req, res) { csvReaderCtrl.listNames(req, res); });
    app.route('/restapi/csv/delete/:fileName')
        .delete(function (req, res) { csvReaderCtrl.deleteFile(req, res); });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
