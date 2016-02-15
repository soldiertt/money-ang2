var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Transaction = require('./tx.srv.model');

var PeriodSchema = new Schema({
  year: {
    type:Number,
    required: 'Year is required'
  },
  index: {
    type:Number,
    required: 'Period index is required'
  },
  total: {
    type: Number,
    required: 'Total is required'
  },
  txList: {
    type: [Transaction]
  }
});

PeriodSchema.set('toJSON', {
  getters: true
});

module.exports = PeriodSchema;
