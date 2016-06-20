"use strict";
var preference_srv_ctrl_1 = require("../ctrl/preference.srv.ctrl");
function default_1(app) {
    var preferenceCtrl = new preference_srv_ctrl_1.default();
    app.route("/restapi/preference")
        .get(function (req, res) { preferenceCtrl.list(req, res); })
        .post(function (req, res) { preferenceCtrl.create(req, res); });
    app.route("/restapi/preference/:preferenceId")
        .get(function (req, res) { preferenceCtrl.read(req, res); })
        .put(function (req, res) { preferenceCtrl.update(req, res); })
        .delete(function (req, res) { preferenceCtrl.delete(req, res); });
    app.param("preferenceId", function (req, res, next, id) { preferenceCtrl.findByID(req, res, next, id); });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
//# sourceMappingURL=preference.srv.route.js.map