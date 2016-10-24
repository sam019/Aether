const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  timestamp: Number,
  username: String,
  type: String,
  content: String,
});
const groupSchema = new mongoose.Schema({
  groupName: { type: String, unique: true },
  messages: [messageSchema],
  created: { type: Date, default: Date.now, index: true },
  updated: { type: Date, default: Date.now, index: true },
});
groupSchema.statics.findByName = function(groupName) {
  return this.findOne({ groupName }, 'groupName messages').exec();
};

module.exports = mongoose.model('Group', groupSchema);
