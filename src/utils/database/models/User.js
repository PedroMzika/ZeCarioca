const { Schema, model } = require('mongoose')

const PlaylistSong = new Schema({
  _id: String,
  title: String,
  uri: String
})

const PlaylistItems = new Schema({
  name: {
    type: String,
    default: 'Favoritas'
  },

  songs: [PlaylistSong],

  author: {
    type: String
  }
})

const User = new Schema({
  _id: {
    type: String
  },

  playlists: {
    type: Array,
    of: PlaylistItems,
    default: []
  }
})

module.exports = model('User', User)
