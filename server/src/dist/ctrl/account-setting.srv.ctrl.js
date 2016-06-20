"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mongoose = require("mongoose");
var basic_crud_srv_ctrl_1 = require("./basic-crud.srv.ctrl");
var AccountSettingCtrl = (function (_super) {
    __extends(AccountSettingCtrl, _super);
    function AccountSettingCtrl() {
        var AccountSetting = mongoose.model("AccountSetting");
        _super.call(this, AccountSetting, "AccountSetting");
    }
    AccountSettingCtrl.prototype.update = function (req, res) {
        var accountSetting = req.accountSetting;
        accountSetting.name = req.body.name;
        accountSetting.accountNumber = req.body.accountNumber;
        accountSetting.headerLinesCount = req.body.headerLinesCount;
        accountSetting.fieldSeparator = req.body.fieldSeparator;
        accountSetting.fieldMappings = req.body.fieldMappings;
        accountSetting.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: this.getErrorMessage(err)
                });
            }
            else {
                res.json(accountSetting);
            }
        });
    };
    return AccountSettingCtrl;
}(basic_crud_srv_ctrl_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AccountSettingCtrl;
//# sourceMappingURL=account-setting.srv.ctrl.js.map