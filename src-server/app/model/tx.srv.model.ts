import {Schema} from "mongoose";
import accountSchema from "./account.srv.model";

let transactionSchema = new Schema({
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
    type: accountSchema,
    required: "Own account is required"
  },
  thirdPartyAccount: {
    type: accountSchema,
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

export default transactionSchema;
