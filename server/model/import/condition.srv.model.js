var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ConditionSchema = new Schema({
  fieldName: {
    type: String,
    required: 'Field name is required'
  },
  fieldType: {
    type: String,
    required: 'Filed type is required',
    enum: ["STRING", "NUMBER"]
  },
  operator: {
    type: String,
    required: 'Operator is required',
    enum: ["EQUAL", "GREATERTHAN", "LOWERTHAN", "CONTAINS"]
  },
  valueStr: {
    type: String
  },
  valueNum: {
    type: Number
  }
});

ConditionSchema.set('toJSON', {
  getters: true
});

module.exports = ConditionSchema;
