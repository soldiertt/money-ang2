import {Schema} from 'mongoose';
import conditionSchema from './import/condition.srv.model';

let ruleSchema = new Schema({
    name: {
      type: String,
      required: 'Rule name is required',
      trim: true
    },
    conditions: {
      type: [conditionSchema],
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

ruleSchema.set('toJSON', {
    getters: true
});

export default ruleSchema;
