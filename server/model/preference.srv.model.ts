import {Schema} from 'mongoose';

let preferenceSchema = new Schema({
    csvPath: {
      type: String,
      required: 'Csv path is required',
      trim: true
    }
});

preferenceSchema.set('toJSON', {
    getters: true
});

export default preferenceSchema;
