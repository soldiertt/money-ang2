"use strict";
var mongoose_1 = require("mongoose");
var account_srv_model_1 = require("./account.srv.model");
var transactionSchema = new mongoose_1.Schema({
    ref: {
        type: String,
        required: "Reference is required",
        trim: true
    },
    date: {
        type: Date,
        required: "Date is required"
    },
    amount: {
        type: Number,
        required: "Amount is required"
    },
    ownAccount: {
        type: account_srv_model_1.default,
        required: "Own account is required"
    },
    thirdPartyAccount: {
        type: account_srv_model_1.default,
        required: "Third-party account is required"
    },
    communication: {
        type: String
    },
    dateCompta: {
        type: Date
    },
    comment: {
        type: String
    }
});
transactionSchema.set("toJSON", {
    getters: true
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = transactionSchema;
