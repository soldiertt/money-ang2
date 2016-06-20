"use strict";
var account_setting_srv_ctrl_1 = require("../ctrl/account-setting.srv.ctrl");
function default_1(app) {
    var accountSettingCtrl = new account_setting_srv_ctrl_1.default();
    app.route("/restapi/account-setting")
        .get(function (req, res) { accountSettingCtrl.list(req, res); })
        .post(function (req, res) { accountSettingCtrl.create(req, res); });
    app.route("/restapi/account-setting/:accountSettingId")
        .get(function (req, res) { accountSettingCtrl.read(req, res); })
        .put(function (req, res) { accountSettingCtrl.update(req, res); })
        .delete(function (req, res) { accountSettingCtrl.delete(req, res); });
    app.param("accountSettingId", function (req, res, next, id) { accountSettingCtrl.findByID(req, res, next, id); });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
//# sourceMappingURL=account-setting.srv.route.js.map