"use strict";
var mongoose_1 = require('mongoose');
var conditionSchema = new mongoose_1.Schema({
    fieldName: {
        type: String,
        required: 'Field name is required'
    },
    fieldType: {
        type: String,
        required: 'Filed type is required',
        enum: ["STRING", "NUMBER"]
    },
    operator: {
        type: String,
        required: 'Operator is required',
        enum: ["EQUAL", "GREATERTHAN", "LOWERTHAN", "CONTAINS"]
    },
    valueStr: {
        type: String
    },
    valueNum: {
        type: Number
    }
});
conditionSchema.set('toJSON', {
    getters: true
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = conditionSchema;
