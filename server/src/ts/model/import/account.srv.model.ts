import {Schema} from "mongoose";

let accountSchema = new Schema({
    name: {
        type: String,
        required: "Account name is required",
        trim: true,
        default: "[N/A]"
    },
    number: {
        type: String,
        required: "Account number is required",
        unique: true,
        trim: true,
        default: "[N/A]"
    }
});

accountSchema.set("toJSON", {
    getters: true
});

export default accountSchema;
