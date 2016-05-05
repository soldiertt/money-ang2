"use strict";
var txref_srv_ctrl_1 = require("../ctrl/txref.srv.ctrl");
function default_1(app) {
    var txrefCtrl = new txref_srv_ctrl_1.default();
    app.route("/restapi/txref")
        .post(function (req, res) { txrefCtrl.create(req, res); });
    app.route("/restapi/txref/find")
        .get(function (req, res) { txrefCtrl.find(req, res); });
    app.route("/restapi/txref/:txref")
        .get(function (req, res) { txrefCtrl.read(req, res); })
        .delete(function (req, res) { txrefCtrl.delete(req, res); });
    app.param("txref", function (req, res, next, ref) { txrefCtrl.findByRef(req, res, next, ref); });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
