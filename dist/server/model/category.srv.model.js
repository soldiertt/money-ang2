"use strict";
var mongoose_1 = require("mongoose");
var period_srv_model_1 = require("./import/period.srv.model");
var categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: "Name is required",
        unique: true,
        trim: true
    },
    frequency: {
        type: String,
        required: "Frequency is required",
        enum: ["MONTHLY", "QUARTER", "YEARLY"]
    },
    years: {
        type: [Number],
        required: "Year is required",
        min: 2000,
        max: 3000
    },
    type: {
        type: String,
        required: "Type is required",
        enum: ["FIXED", "OTHER", "INCOMING"]
    },
    nbPeriods: {
        type: Number,
        required: "Nb periods is required",
        min: 1,
        max: 12
    },
    periods: {
        type: [period_srv_model_1.default],
        required: "Periods are required"
    }
});
categorySchema.set("toJSON", {
    getters: true
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = categorySchema;
