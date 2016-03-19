var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Condition = require('./import/condition.srv.model');

var RuleSchema = new Schema({
    name: {
      type: String,
      required: 'Rule name is required',
      trim: true
    },
    conditions: {
      type: [Condition],
      required: 'Conditions are required'
    },
    categoryId: {
      type: Schema.ObjectId,
      required: 'Category is required',
      ref: 'Category'
    },
    isActive: {
      type: Boolean,
      required: 'Active status is required'
    }
});

RuleSchema.set('toJSON', {
    getters: true
});

mongoose.model('Rule', RuleSchema);
