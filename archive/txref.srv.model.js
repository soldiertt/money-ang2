var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TxrefSchema = new Schema({
  ref: {
    type: String,
    required: 'Ref is required',
    unique: true,
    trim: true
  }
});

TxrefSchema.set('toJSON', {
    getters: true
});

mongoose.model('Txref', TxrefSchema);
