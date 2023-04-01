const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },


})

module.exports = mongoose.model('Product', ProductSchema)