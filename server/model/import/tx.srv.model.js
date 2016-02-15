var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Account = require('./account.srv.model');

var TransactionSchema = new Schema({
  ref: {
    type: String,
    required: 'Reference is required',
    trim: true
  },
  date: {
    type: Date,
    required: 'Date is required'
  },
  amount: {
    type: Number,
    required: 'Amount is required'
  },
  ownAccount: {
    type: Account,
    required: 'Own account is required'
  },
  thirdPartyAccount: {
    type: Account,
    required: 'Third-party account is required'
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

TransactionSchema.set('toJSON', {
  getters: true
});

module.exports = TransactionSchema;
