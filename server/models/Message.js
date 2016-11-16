const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  timestamp: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  type: String,
  content: String,
});

module.exports = mongoose.model('Message', messageSchema);
