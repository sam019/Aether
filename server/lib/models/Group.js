const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  groupName: { type: String, unique: true },
  avatar: String,
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message'}],
});
groupSchema.statics.getFullData = function(groupName) {
  return this.findOne({ groupName })
  .populate({
    path: 'messages',
    options: {
      sort: { _id: -1 },
    },
    populate: {
      path: 'user',
      select: 'username avatar',
    },
  })
  .exec();
};
groupSchema.statics.getSimpleData = function(groupName) {
  return this.findOne({ groupName }).exec();
};
groupSchema.statics.getMessages = function(groupName, skip) {
  return this.findOne({ groupName })
  .populate({
    path: 'messages',
    options: {
      sort: { _id: -1 },
      limit: 15,
      skip,
    },
    populate: {
      path: 'user',
      select: 'username avatar',
    },
  })
  .exec();
};

module.exports = mongoose.model('Group', groupSchema);
