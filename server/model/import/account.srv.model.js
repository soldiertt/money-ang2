var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AccountSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required',
        trim: true
    },
    accountNumber: {
        type: String,
        required: 'Account number is required',
        unique: true,
        trim: true
    }
});

AccountSchema.set('toJSON', {
    getters: true
});

module.exports = AccountSchema;
