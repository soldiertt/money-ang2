"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mongoose = require("mongoose");
var basic_crud_srv_ctrl_1 = require("./basic-crud.srv.ctrl");
var TxrefCtrl = (function (_super) {
    __extends(TxrefCtrl, _super);
    function TxrefCtrl() {
        var Txref = mongoose.model("Txref");
        _super.call(this, Txref, "Txref");
    }
    TxrefCtrl.prototype.findByRef = function (req, res, next, ref) {
        this.objectModel.findOne({ ref: ref }).exec(function (err, object) {
            if (err) {
                return next(err);
            }
            req.object = object;
            next();
        });
    };
    TxrefCtrl.prototype.find = function (req, res) {
        var txrefList = req.query.txref;
        this.objectModel.find({
            ref: { $in: txrefList }
        }).exec(function (err, references) {
            if (err) {
                return res.status(400).send({
                    message: this.getErrorMessage(err)
                });
            }
            else {
                res.json(references);
            }
        });
    };
    return TxrefCtrl;
}(basic_crud_srv_ctrl_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TxrefCtrl;
