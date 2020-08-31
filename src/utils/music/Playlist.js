module.exports = class Playlist {
  /* static async create (user, options = {}, song) {
    console.log(user)
    const findedPlaylist = user.playlists.find(({ name }) => name === options.name)

    if (findedPlaylist) {
      if (findedPlaylist.songs.find(({ _id }) => _id === song._id)) return null

      findedPlaylist.songs.push(song)
      user.markModified('playlists')
      await user.save()

      return { type: 'song', info: song }
    } else {
      const newPlaylist = {
        name: options.name,
        songs: [song],
        author: options.author.id
      }

      user.playlists.push(newPlaylist)

      user.markModified('playlists')
      await user.save()

      return { type: 'playlist', info: newPlaylist }
    }
  } */

  static async create (user, { author, name, song }) {
    const findedPlaylist = user.playlists.find(list => list.name === name)

    const response = {}

    if (findedPlaylist) {
      if (findedPlaylist.songs.find(({ _id }) => _id === song._id)) return null
      findedPlaylist.songs.push(song)

      Object.assign(response, { type: 'song', info: song })
    } else {
      const newPlaylist = {
        name: name,
        songs: [song],
        author: author.id
      }

      user.playlists.push(newPlaylist)

      Object.assign(response, { type: 'playlist', info: newPlaylist })
    }

    user.markModified('playlists')
    await user.save()

    return response
  }
}
