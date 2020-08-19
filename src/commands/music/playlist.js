const { Command, ParrotEmbed } = require('../../')
const { User } = require('../../utils/database/')
const { Playlist } = require('../../utils/music')

module.exports = class PlaylistCommand extends Command {
  constructor (client) {
    super({
      name: 'playlist',
      aliases: ['pl', 'list'],
      category: 'Música',
      description: 'Toca alguma playlist.',
      usage: 'playlist <nome> ou playlist [add] [url/nome]',
      utils: { voiceChannel: true }
    }, client)
  }

  async run ({ message, author, channel, member }, args) {
    const player = this.client.music.players.get(message.guild.id)

    const user = await User.findById(author.id) || await User.create({ _id: author.id })

    switch (args[0]) {
      case 'play': {
        const player = await this.client.music.join({
          guild: message.guild.id,
          voiceChannel: member.voice.channel.id,
          textChannel: channel,
          dj: author
        }, { selfDeaf: true })

        for (const track of user.playlists) {
          player.addToQueue(track, author)
        }

        channel.send(new ParrotEmbed(author).setDescription('<:music:708136949189443645> | Adicionei `' + user.playlists.length + '` músicas da sua playlist.'))

        if (!player.playing) return player.play()

        break
      }

      case 'add': {
        let song = player.track
        if (args[1] <= player.queue.length) song = player.queue[args[1]].track
        /* if (args[1] <= player.queue.length) {
            user.playlists.push(player.queue[args[1]])
            await user.save()
            return channel.send(new ParrotEmbed(author).setDescription(`<:musicFile:708136949264941126> | Música **${player.queue[args[1]].info.title}** adicionada á sua playlist!`))
          }

          user.playlists.push(player.queue[0])
          await user.save()
          channel.send(new ParrotEmbed(author).setDescription(`<:musicFile:708136949264941126> | Música **${player.queue[0].info.title}** adicionada á sua playlist!`)) */

        const playlistSong = {
          _id: song.info.identifier,
          title: song.info.title,
          uri: song.info.uri
        }

        /* const playlist = {
          name: 'Teste',
          songs: [playlistSong],
          author: author.id
        }

        if (user) {
          user.playlists.push(playlist)
          user.markModified('playlists')

          user.save()
        } */

        const a = await Playlist.create(user, { name: 'Teste', author, song: playlistSong })

        if (a) channel.send(a.type === 'playlist' ? a.info.name : a.info.title)
        else channel.send('Já está adicionada')

        break
      }

      case 'remove': {
        await channel.send(new ParrotEmbed().setDescription(`<:musicEject:708136949365473340> | Música **${user.playlists[args[1]].info.title}** removida da sua playlist!`))
        user.playlists.splice(args[1], 1)
        await user.save()
      }
    }
  }
}
