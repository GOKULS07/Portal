const mongoose = require('mongoose');

const GrievanceSchema = new mongoose.Schema({
  issueType: String,
  category: String,
  title: String,
  description: String,
  status: { type: String, default: 'Pending' },
  date: { type: Date, default: Date.now },
  name: String,
  email: String,
});

module.exports = mongoose.model('Grievance', GrievanceSchema);
