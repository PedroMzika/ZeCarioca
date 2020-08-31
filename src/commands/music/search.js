const { Command, ParrotEmbed } = require('../../')
const { songInfos } = require('../../utils/music')

module.exports = class SearchCommand extends Command {
  constructor (client) {
    super(
      {
        name: 'search',
        aliases: ['procurar'],
        category: 'Música',
        description: 'Procure e reproduza a sua música favorita no Discord.',
        utils: { voiceChannel: true },
        usage: 'search <nome da música>; <número>'
      },
      client
    )
  }

  async run ({ message, channel, member, author }, args) {
    const memberChannel = member.voice.channel.id

    const { tracks, loadType } = await this.client.music.fetchTracks(args.join(' '))

    if (['LOAD_FAILED', 'NO_MATCHES'].includes(loadType)) return channel.send(new ParrotEmbed().setDescription('⚠️ | Não consegui achar nenhuma música.'))

    const embed = new ParrotEmbed(author)
      .setTitle(`Resultados de: \`${args.join(' ')}\``)
      .setDescription(songInfos(tracks, 'title'))
      .setFooter('Digite "cancelar" para cancelar a pesquisa')
    const msg = await channel.send(embed)

    const warnsEmbeds = new ParrotEmbed(author)

    const filter = member => member.author.id === message.author.id
    const messages = await channel.awaitMessages(filter, { time: 30000, max: 1 })
    const messageCollected = messages.first()

    if (!messageCollected) {
      msg.delete()
      return channel.send(warnsEmbeds.setDescription('⚠️ | Você não forneceu nenhum número, cancelando.')).then(msg => msg.delete({ timeout: 30000 }))
    }
    const player = await this.client.music.join({
      guild: message.guild.id,
      voiceChannel: memberChannel,
      textChannel: channel,
      dj: author
    }, { selfDeaf: true })

    if (messageCollected.content === 'cancelar') {
      if (!player) player.destroy()
      msg.delete()
      return channel.send(warnsEmbeds.setDescription('<:musicEject:708136949365473340> | Pesquisa cancelada.')).then(msg => msg.delete({ timeout: 30000 }))
    }

    const selected = Math.max(Math.min(messageCollected.content, 9), -1)

    if (isNaN(messageCollected.content)) return channel.send(warnsEmbeds.setDescription('⚠️ | Você não forneceu um número!')).then(msg => msg.delete({ timeout: 30000 }))

    player.addToQueue(tracks[selected], message.author)

    channel.send(new ParrotEmbed().setDescription(`<:music:708136949189443645> | Adicionado na playlist: **${tracks[selected].info.title}**.`)).then(msg => msg.delete({ timeout: 30000 }))

    msg.delete()

    if (!player.playing) return player.play()
  }
}
