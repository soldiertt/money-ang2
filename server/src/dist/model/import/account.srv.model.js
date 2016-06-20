"use strict";
var mongoose_1 = require("mongoose");
var accountSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: "Account name is required",
        trim: true,
        default: "[N/A]"
    },
    number: {
        type: String,
        required: "Account number is required",
        unique: true,
        trim: true,
        default: "[N/A]"
    }
});
accountSchema.set("toJSON", {
    getters: true
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = accountSchema;
//# sourceMappingURL=account.srv.model.js.map