var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Period = require('./import/period.srv.model');

var CategorySchema = new Schema({
  name: {
    type: String,
    required: 'Name is required',
    unique: true,
    trim: true
  },
  frequency: {
    type: String,
    required: 'Frequency is required',
    enum: ["MONTHLY", "QUARTER", "YEARLY"]
  },
  years: {
    type: [Number],
    required: 'Year is required',
    min: 2000,
    max: 3000
  },
  type: {
    type: String,
    required: 'Type is required',
    enum: ["FIXED", "OTHER", "INCOMING"]
  },
  periods: {
    type: [Period],
    required: 'Periods are required'
  }
});

CategorySchema.set('toJSON', {
  getters: true
});

mongoose.model('Category', CategorySchema);
