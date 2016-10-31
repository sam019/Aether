const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  groups: { type: Array, default: ['main'] },
  created: { type: Date, default: Date.now, index: true },
  updated: { type: Date, default: Date.now, index: true },
});

userSchema.statics.findByName = function(username) {
  return this.findOne({ username }, 'username password groups -_id').exec();
};

module.exports = mongoose.model('User', userSchema);
