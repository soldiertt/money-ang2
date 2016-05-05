"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mongoose = require("mongoose");
var basic_crud_srv_ctrl_1 = require("./basic-crud.srv.ctrl");
var RuleCtrl = (function (_super) {
    __extends(RuleCtrl, _super);
    function RuleCtrl() {
        var Rule = mongoose.model("Rule");
        _super.call(this, Rule, "Rule");
    }
    RuleCtrl.prototype.update = function (req, res) {
        var rule = req.object;
        rule.name = req.body.name;
        rule.conditions = req.body.conditions;
        rule.categoryId = req.body.categoryId;
        rule.isActive = req.body.isActive;
        rule.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: this.getErrorMessage(err)
                });
            }
            else {
                res.json(rule);
            }
        });
    };
    RuleCtrl.prototype.list = function (req, res) {
        var queryObj = {};
        this.objectModel.find(queryObj).populate("categoryId", "-periods").lean().exec(function (err, objectList) {
            if (err) {
                return res.status(400).send({
                    message: this.getErrorMessage(err)
                });
            }
            else {
                objectList = objectList.map(function (elem) {
                    elem.id = elem._id;
                    elem.category = elem.categoryId; // id was populated with object
                    elem.categoryId = elem.category._id;
                    return elem;
                });
                res.json(objectList);
            }
        });
    };
    return RuleCtrl;
}(basic_crud_srv_ctrl_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RuleCtrl;
