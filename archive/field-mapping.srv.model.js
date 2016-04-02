var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FieldMappingSchema = new Schema({
    value: {
      type: String,
      required: 'Value is required',
      trim: true
    },
    index: {
      type: Number,
      required: 'Index is required'
    },
    isDateDMY: {
      type: Boolean,
      required: 'isDateDMY is required'
    },
    isDateYMD: {
      type: Boolean,
      required: 'isDateYMD is required'
    },
    isBelgianNumber: {
      type: Boolean,
      required: 'isBelgianNumber is required'
    }
});

FieldMappingSchema.set('toJSON', {
    getters: true
});

module.exports = FieldMappingSchema;
