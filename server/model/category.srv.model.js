var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: {
        type: String,
        required: 'Name is required',
        trim: true
    },
    frequency: {
        type: String,
        required: 'Frequency is required',
        enum: ["MONTHLY", "QUARTER", "YEARLY"]
    },
    year: {
        type: Number,
        required: 'Year is required',
        min: 2000,
        max: 3000
    },
    type: {
        type: String,
        required: 'Type is required',
        enum: ["FIXED", "OTHER"]
    },
    income: {
        type: Boolean,
        required: 'Income is required'
    }
});


CategorySchema.set('toJSON', {
    getters: true
});

CategorySchema.index({ name: 1, year: 1 }, { unique: true });

mongoose.model('Category', CategorySchema);
