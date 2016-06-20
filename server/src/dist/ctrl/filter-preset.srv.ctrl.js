"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mongoose = require("mongoose");
var basic_crud_srv_ctrl_1 = require("./basic-crud.srv.ctrl");
var FilterPresetCtrl = (function (_super) {
    __extends(FilterPresetCtrl, _super);
    function FilterPresetCtrl() {
        var FilterPreset = mongoose.model("FilterPreset");
        _super.call(this, FilterPreset, "FilterPreset");
    }
    FilterPresetCtrl.prototype.update = function (req, res) {
        var preset = req.object;
        preset.name = req.body.name;
        preset.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: this.getErrorMessage(err)
                });
            }
            else {
                res.json(preset);
            }
        });
    };
    return FilterPresetCtrl;
}(basic_crud_srv_ctrl_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FilterPresetCtrl;
//# sourceMappingURL=filter-preset.srv.ctrl.js.map