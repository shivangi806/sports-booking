const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  centre: { type: mongoose.Schema.Types.ObjectId, ref: 'Centre', required: true },
  courts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Court' }]
});

module.exports = mongoose.model('Sport', sportSchema);
