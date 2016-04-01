import {Schema} from 'mongoose';
import periodSchema from './import/period.srv.model';

let categorySchema = new Schema({
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
  nbPeriods: {
    type: Number,
    required: 'Nb periods is required',
    min: 1,
    max: 12
  },
  periods: {
    type: [periodSchema],
    required: 'Periods are required'
  }
});

categorySchema.set('toJSON', {
  getters: true
});

export default categorySchema;
