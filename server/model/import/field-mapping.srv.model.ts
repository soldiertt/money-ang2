import {Schema} from "mongoose";

let fieldMappingSchema = new Schema({
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

export default fieldMappingSchema;
