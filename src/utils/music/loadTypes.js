const { ParrotEmbed } = require('../../')

module.exports = async (player, channel, author, args) => {
  const { tracks, playlistInfo, loadType } = await author.client.music.fetchTracks(args)
  const embed = new ParrotEmbed(author)

  switch (loadType) {
    case 'NO_MATCHES': {
      channel.send(embed.setDescription('⚠️ | Não achei nenhum resultado.'))
        .then(msg => msg.delete({ timeout: 15000 }))
      break
    }

    case 'SEARCH_RESULT':
    case 'TRACK_LOADED': {
      player.addToQueue(tracks[0], author)
      channel.send(embed.setDescription(`<:music:708136949189443645> | Adicionado na fila: **${tracks[0].info.title}**!`))
        .then(msg => msg.delete({ timeout: 15000 }))

      if (!player.playing) return player.play()
      break
    }

    case 'PLAYLIST_LOADED': {
      for (const track of tracks) player.addToQueue(track, author)

      channel.send(embed.setDescription(`<:music:708136949189443645> | Adicionei \`${tracks.length}\` músicas da playlist \`${playlistInfo.name}\`.`))
        .then(msg => msg.delete({ timeout: 15000 }))
      if (!player.playing) return player.play()
      break
    }
  }
}
