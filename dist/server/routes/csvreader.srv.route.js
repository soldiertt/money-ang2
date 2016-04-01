"use strict";
var csvreader_srv_ctrl_1 = require('../ctrl/csvreader.srv.ctrl');
function default_1(app) {
    var csvReaderCtrl = new csvreader_srv_ctrl_1.default();
    app.route('/restapi/csvreader')
        .get(function (req, res) { csvReaderCtrl.list(req, res); });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
