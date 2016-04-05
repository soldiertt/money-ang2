"use strict";
var mongoose_1 = require('mongoose');
var preferenceSchema = new mongoose_1.Schema({
    useDefaultCsvPath: {
        type: Boolean,
        required: 'Use default csv path option is required'
    },
    csvPath: {
        type: String,
        trim: true
    }
});
preferenceSchema.set('toJSON', {
    getters: true
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = preferenceSchema;
