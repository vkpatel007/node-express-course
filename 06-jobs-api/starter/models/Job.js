const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    require: [true, 'Please provide company'],
    maxlength: 50,
  },
  position: {
    type: String,
    require: [true, 'Please provide position'],
    maxlength: 100,
  },
  status: {
    type: String,
    enum: ['interview', 'declined', 'pending'],
    default: 'pending',
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    require: [true, 'please provide user']
  }
}, { timestamps: true })


module.exports = mongoose.model('Job', JobSchema)