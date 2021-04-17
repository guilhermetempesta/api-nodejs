const mongoose = require('mongoose');
const { Schema } = mongoose;

const statSchema = new Schema({
  users: Number,
  categories: Number,
  articles: Number,
  createdAt: Date
});

const Stat = mongoose.model('Stat', statSchema);

module.exports = { Stat }