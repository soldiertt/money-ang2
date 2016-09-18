import {Schema} from "mongoose";
import fieldMappingSchema from "./field-mapping.srv.model";

let accountSettingSchema = new Schema({
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
      type: [fieldMappingSchema],
      required: "Field mappings are required"
    }
});

accountSettingSchema.set("toJSON", {
    getters: true
});

export default accountSettingSchema;
