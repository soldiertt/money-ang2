var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    FieldMapping = require('./import/field-mapping.srv.model');

var AccountSettingSchema = new Schema({
    name: {
      type: String,
      required: 'Account name is required',
      unique: true,
      trim: true
    },
    fileStartsWith: {
      type: String,
      required: 'File starts with is required',
      unique: true,
      trim: true
    },
    accountNumber: {
      type: String,
      required: 'Account number is required',
      unique: true,
      trim: true
    },
    headerLinesCount: {
      type: Number,
      required: 'Header lines count is required'
    },
    fieldSeparator: {
      type:String,
      required: 'Field separator is required'
    },
    fieldMappings: {
      type:[FieldMapping],
      required: 'Field mappings are required'
    }
});

AccountSettingSchema.set('toJSON', {
    getters: true
});

mongoose.model('AccountSetting', AccountSettingSchema);
