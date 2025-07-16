const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  avatarId: { type: String, default: null },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Player', playerSchema);
