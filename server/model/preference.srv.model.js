var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PreferenceSchema = new Schema({
    csvPath: {
      type: String,
      required: 'csvPath name is required',
      trim: true
    }
});

PreferenceSchema.set('toJSON', {
    getters: true
});

mongoose.model('Preference', PreferenceSchema);
