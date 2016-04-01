"use strict";
var mongoose_1 = require('mongoose');
var tx_srv_model_1 = require('./tx.srv.model');
var periodSchema = new mongoose_1.Schema({
    year: {
        type: Number,
        required: 'Year is required'
    },
    index: {
        type: Number,
        required: 'Period index is required'
    },
    total: {
        type: Number,
        required: 'Total is required'
    },
    txList: {
        type: [tx_srv_model_1.default]
    },
    markAsPaid: {
        type: Boolean
    }
});
periodSchema.set('toJSON', {
    getters: true
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = periodSchema;
