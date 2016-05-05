"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mongoose = require("mongoose");
var basic_crud_srv_ctrl_1 = require("./basic-crud.srv.ctrl");
var PreferenceCtrl = (function (_super) {
    __extends(PreferenceCtrl, _super);
    function PreferenceCtrl() {
        var Preference = mongoose.model("Preference");
        _super.call(this, Preference, "Preference");
    }
    PreferenceCtrl.prototype.update = function (req, res) {
        var preference = req.object;
        preference.useDefaultCsvPath = req.body.useDefaultCsvPath;
        preference.csvPath = req.body.csvPath;
        preference.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: this.getErrorMessage(err)
                });
            }
            else {
                res.json(preference);
            }
        });
    };
    return PreferenceCtrl;
}(basic_crud_srv_ctrl_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PreferenceCtrl;
