"use strict";
var rule_srv_ctrl_1 = require('../ctrl/rule.srv.ctrl');
function default_1(app) {
    var ruleCtrl = new rule_srv_ctrl_1.default();
    app.route('/restapi/rule')
        .get(function (req, res) { ruleCtrl.list(req, res); })
        .post(function (req, res) { ruleCtrl.create(req, res); });
    app.route('/restapi/rule/:ruleId')
        .get(function (req, res) { ruleCtrl.read(req, res); })
        .put(function (req, res) { ruleCtrl.update(req, res); })
        .delete(function (req, res) { ruleCtrl.delete(req, res); });
    app.param('ruleId', function (req, res, next, id) { ruleCtrl.findByID(req, res, next, id); });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
