var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PreferenceSchema = new Schema({
    csvPath: {
      type: String,
      required: 'Csv path is required',
      trim: true
    },
    workingYear: {
      type: Number,
      required: 'Working year is required',
    }
});

PreferenceSchema.set('toJSON', {
    getters: true
});

mongoose.model('Preference', PreferenceSchema);