"use strict";
var mongoose_1 = require("mongoose");
var condition_srv_model_1 = require("./import/condition.srv.model");
var ruleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: "Rule name is required",
        trim: true
    },
    conditions: {
        type: [condition_srv_model_1.default],
        required: "Conditions are required"
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: "Category is required",
        ref: "Category"
    },
    isActive: {
        type: Boolean,
        required: "Active status is required"
    }
});
ruleSchema.set("toJSON", {
    getters: true
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ruleSchema;
