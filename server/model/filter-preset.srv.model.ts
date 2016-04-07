import {Schema} from 'mongoose';

let filterPresetSchema = new Schema({
  name: {
    type: String,
    required: 'Name is required',
    trim: true
  },
  catTypeFixed: {
    type: Boolean,
    required: 'Category type FIXED is required'
  },
  catTypeOther: {
    type: Boolean,
    required: 'Category type OTHER is required'
  },
  catTypeIncoming: {
    type: Boolean,
    required: 'Category type INCOMING is required'
  },
  catFreqMonthly: {
    type: Boolean,
    required: 'Category frequency MONTHLY is required'
  },
  catFreqQuarter: {
    type: Boolean,
    required: 'Category frequency QUARTER is required'
  },
  catFreqYearly: {
    type: Boolean,
    required: 'Category frequency YEARLY is required'
  },
  showTotals: {
    type: Boolean,
    required: 'Show totals is required'
  }
});

filterPresetSchema.set('toJSON', {
    getters: true
});

export default filterPresetSchema;
