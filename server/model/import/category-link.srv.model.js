var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategoryLinkSchema = new Schema({
  categoryId: {
    type: Schema.ObjectId,
    required: 'CategoryId is required',
    ref: 'Category'
  },
  categoryYear: {
    type: Number,
    required: 'Category year is required',
  },
  periodIndex: {
    type: Number,
    required: 'Category index is required',
  }
});

CategoryLinkSchema.set('toJSON', {
    getters: true
});

module.exports = CategoryLinkSchema;
