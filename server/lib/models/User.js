const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  avatar: String,
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  allowNotification: { type: Boolean, default: true },
  allowSound: { type: Boolean, default: true },
  sign: String,
  location: String,
  created: { type: Date, default: Date.now() },
});

userSchema.statics.getFullInfo = function(username) {
  return this.findOne({ username }).populate({
    path: 'groups',
    populate: {
      path: 'messages',
      options: {
        sort: { _id: -1 },
        limit: 30,
      },
      populate: {
        path: 'user',
        select: 'username avatar'
      },
    },
  });
};
userSchema.statics.getSimpleInfo = function(username) {
  return this.findOne({ username })
  .populate({ path: 'groups' })
  .exec();
};

module.exports = mongoose.model('User', userSchema);
