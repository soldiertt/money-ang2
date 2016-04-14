import {Schema} from "mongoose";
import txSchema from "./tx.srv.model";

let periodSchema = new Schema({
  year: {
    type: Number,
    required: "Year is required"
  },
  index: {
    type: Number,
    required: "Period index is required"
  },
  total: {
    type: Number,
    required: "Total is required"
  },
  txList: {
    type: [txSchema]
  },
  markAsPaid: {
    type: Boolean
  }
});

periodSchema.set("toJSON", {
  getters: true
});

export default periodSchema;
