"use strict";
var mongoose_1 = require("mongoose");
var field_mapping_srv_model_1 = require("./import/field-mapping.srv.model");
var accountSettingSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: "Account name is required",
        unique: true,
        trim: true
    },
    fileStartsWith: {
        type: String,
        required: "File starts with is required",
        unique: true,
        trim: true
    },
    accountNumber: {
        type: String,
        required: "Account number is required",
        unique: true,
        trim: true
    },
    headerLinesCount: {
        type: Number,
        required: "Header lines count is required"
    },
    fieldSeparator: {
        type: String,
        required: "Field separator is required"
    },
    generateIdentifier: {
        type: Boolean,
        required: "Generate identifier is required"
    },
    fieldMappings: {
        type: [field_mapping_srv_model_1.default],
        required: "Field mappings are required"
    }
});
accountSettingSchema.set("toJSON", {
    getters: true
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = accountSettingSchema;
