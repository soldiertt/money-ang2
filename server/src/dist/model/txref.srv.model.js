"use strict";
var mongoose_1 = require("mongoose");
var txrefSchema = new mongoose_1.Schema({
    ref: {
        type: String,
        required: "Ref is required",
        unique: true,
        trim: true
    }
});
txrefSchema.set("toJSON", {
    getters: true
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = txrefSchema;
