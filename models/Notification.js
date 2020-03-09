const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    date: {
      type: Date,
      default: new Date()
    },
    userId: {
      required: true,
      type: mongoose.ObjectId
    },
    plantId: {
      required: true,
      type: mongoose.ObjectId
    },
    message: {
      type: String,
      required: true
    },
    seen: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

module.exports = mongoose.model('Notification', NotificationSchema);
