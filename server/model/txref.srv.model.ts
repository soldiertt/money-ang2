import {Schema} from 'mongoose';

let txrefSchema = new Schema({
  ref: {
    type: String,
    required: 'Ref is required',
    unique: true,
    trim: true
  }
});

txrefSchema.set('toJSON', {
    getters: true
});

export default txrefSchema;
