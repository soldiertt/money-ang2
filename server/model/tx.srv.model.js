var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Account = require('./import/account.srv.model'),
    CategoryLink = require('./import/category-link.srv.model');

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
    },
    categoryLink: {
      type: CategoryLink,
      required: 'Category link is required'
    }
});


TransactionSchema.set('toJSON', {
    getters: true
});

mongoose.model('Transaction', TransactionSchema);
