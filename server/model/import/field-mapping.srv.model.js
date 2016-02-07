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
    }
});

FieldMappingSchema.set('toJSON', {
    getters: true
});

module.exports = FieldMappingSchema;
