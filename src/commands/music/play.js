const { Command, ParrotEmbed } = require('../../')

module.exports = class PlayCommand extends Command {
  constructor (client) {
    super(
      {
        name: 'play',
        aliases: ['tocar', 'p'],
        category: 'Música',
        description: 'Reproduza a sua música favorita no Discord.',
        utils: { voiceChannel: true },
        usage: 'play <música/link/identifier>'
      },
      client
    )
  }

  async run ({ message, channel, member, author }, args) {
    const memberChannel = member.voice.channel.id

    const player = await this.client.music.join({
      guild: message.guild.id,
      voiceChannel: memberChannel,
      textChannel: channel,
      dj: author
    }, { selfDeaf: true })

    if (player.voiceChannel !== memberChannel) return channel.send(new ParrotEmbed(author).setDescription('⚠️ | Você não está no mesmo canal que eu!')).then(msg => msg.delete({ timeout: 15000 }))

    const { tracks, playlistInfo, loadType } = await this.client.music.fetchTracks(args.join(' '))

    switch (loadType) {
      case 'NO_MATCHES': {
        channel.send(new ParrotEmbed(author).setDescription('⚠️ | Não achei nenhum resultado.')).then(msg => msg.delete({ timeout: 15000 }))
        break
      }

      case 'SEARCH_RESULT':
      case 'TRACK_LOADED': {
        player.addToQueue(tracks[0], message.author)
        channel.send(new ParrotEmbed(author).setDescription(`<:music:708136949189443645> | Adicionado na fila: **${tracks[0].info.title}**!`)).then(msg => msg.delete({ timeout: 15000 }))
        if (!player.playing) return player.play()
        break
      }

      case 'PLAYLIST_LOADED': {
        for (const track of tracks) {
          player.addToQueue(track, message.author)
        }
        channel.send(new ParrotEmbed(author).setDescription('<:music:708136949189443645> | Adicionei `' + tracks.length + '` músicas da playlist `' + playlistInfo.name + '`.')).then(msg => msg.delete({ timeout: 15000 }))
        if (!player.playing) return player.play()
        break
      }
    }
  }
}
