"use strict";
var category_srv_ctrl_1 = require("../ctrl/category.srv.ctrl");
function default_1(app) {
    var categoryCtrl = new category_srv_ctrl_1.default();
    app.route("/restapi/category")
        .get(function (req, res) { categoryCtrl.list(req, res); })
        .post(function (req, res) { categoryCtrl.create(req, res); });
    app.route("/restapi/category/addtx")
        .post(function (req, res) { categoryCtrl.addTx(req, res); });
    app.route("/restapi/category/removetx/:periodId")
        .post(function (req, res) { categoryCtrl.removeTx(req, res); });
    app.route("/restapi/category/search")
        .get(function (req, res) { categoryCtrl.search(req, res); });
    app.route("/restapi/tx/search")
        .get(function (req, res) { categoryCtrl.searchTx(req, res); });
    app.route("/restapi/category/period/markAsPaid")
        .put(function (req, res) { categoryCtrl.updatePeriodMarkAsPaid(req, res); });
    app.route("/restapi/category/:categoryId")
        .get(function (req, res) { categoryCtrl.read(req, res); })
        .put(function (req, res) { categoryCtrl.update(req, res); })
        .delete(function (req, res) { categoryCtrl.delete(req, res); });
    app.param("categoryId", function (req, res, next, id) { categoryCtrl.findByID(req, res, next, id); });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
