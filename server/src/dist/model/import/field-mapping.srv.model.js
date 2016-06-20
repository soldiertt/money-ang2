"use strict";
var mongoose_1 = require("mongoose");
var fieldMappingSchema = new mongoose_1.Schema({
    value: {
        type: String,
        required: "Value is required",
        trim: true
    },
    index: {
        type: Number,
        required: "Index is required"
    },
    isDateDMY: {
        type: Boolean,
        required: "isDateDMY is required"
    },
    isDateYMD: {
        type: Boolean,
        required: "isDateYMD is required"
    },
    isBelgianNumber: {
        type: Boolean,
        required: "isBelgianNumber is required"
    }
});
fieldMappingSchema.set("toJSON", {
    getters: true
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = fieldMappingSchema;
//# sourceMappingURL=field-mapping.srv.model.js.map