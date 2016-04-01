"use strict";
var mongoose_1 = require('mongoose');
var preferenceSchema = new mongoose_1.Schema({
    csvPath: {
        type: String,
        required: 'Csv path is required',
        trim: true
    }
});
preferenceSchema.set('toJSON', {
    getters: true
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = preferenceSchema;
