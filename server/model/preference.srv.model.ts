import {Schema} from 'mongoose';

let preferenceSchema = new Schema({
  useDefaultCsvPath: {
    type: Boolean,
    required: 'Use default csv path option is required'
  },
  csvPath: {
    type: String,
    trim: true
  }
});

preferenceSchema.set('toJSON', {
    getters: true
});

export default preferenceSchema;
