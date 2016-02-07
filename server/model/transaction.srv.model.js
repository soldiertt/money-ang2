var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Account = require('./import/account.srv.model');

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
    own_account: {
      type: Account,
      required: 'OwnAccount is required'
    },
    account: {
      type: Account,
      required: 'Account is required'
    },
    communication: {
      type: String
    },
    date_compta: {
      type: Date
    },
    category: {
      type: Schema.ObjectId,
      required: 'Category is required',
      ref: 'Category'
    },
    index: {
      type: Number,
      required: 'Category index is required',
    },
    comment: {
      type: String
    }
});


TransactionSchema.set('toJSON', {
    getters: true
});

mongoose.model('Transaction', TransactionSchema);
