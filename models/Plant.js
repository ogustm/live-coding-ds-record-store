const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlantSchema = new Schema({
  userId: {
    required: true,
    type: mongoose.ObjectId
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  lastWatered: {
    type: Date,
    default: Date.now
  },
  waterFrequency: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Plant', PlantSchema);
