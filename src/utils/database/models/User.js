const { Schema, model } = require('mongoose')

const User = new Schema({
  id: {
    type: String,
    required: true
  },

  playlist: {
    type: Array,
    default: []
  }
})

module.exports = model('User', User)
