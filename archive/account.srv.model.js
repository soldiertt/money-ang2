var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AccountSchema = new Schema({
    name: {
        type: String,
        required: 'Account name is required',
        trim: true,
        default: '[N/A]'
    },
    number: {
        type: String,
        required: 'Account number is required',
        unique: true,
        trim: true,
        default: '[N/A]'
    }
});

AccountSchema.set('toJSON', {
    getters: true
});

module.exports = AccountSchema;
