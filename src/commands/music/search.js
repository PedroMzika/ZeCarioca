const { Command, ParrotEmbed } = require('../../')
const { songInfos } = require('../../utils/music')

module.exports = class SearchCommand extends Command {
  constructor(client) {
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

  async run({ message, channel, member, author }, args) {
    const memberChannel = member.voice.channel.id

    const { tracks } = await this.client.music.fetchTracks(args.join(' '))

    const embed = new ParrotEmbed(author)
      .setTitle(`Resultados de: \`${args.join(' ')}\``)
      .setDescription(songInfos(tracks, 'title'))
      .setFooter('Digite "cancelar" para cancelar a pesquisa')
    const msg = await channel.send(embed)

    // eslint-disable-next-line no-unused-vars
    const collector = channel.createMessageCollector(member => member.author.id === message.author.id, { time: 30000, max: 1 })
      .on('collect', async message => {
        const player = await this.client.music.join({
          guild: message.guild.id,
          voiceChannel: memberChannel,
          textChannel: channel,
          dj: author
        }, { selfDeaf: true })

        if (message.content === 'cancelar' && player.queue === 0) {
          player.destroy()
          msg.delete()
          return channel.send(new ParrotEmbed(author).setDescription('<:musicEject:708136949365473340> | Pesquisa cancelada.')).then(msg => msg.delete({ timeout: 30000 }))
        } else if (message.content === 'cancelar') {
          msg.delete()
          return channel.send(new ParrotEmbed(author).setDescription('<:musicEject:708136949365473340> | Pesquisa cancelada.')).then(msg => msg.delete({ timeout: 30000 }))
        }

        if (isNaN(message.content)) return channel.send(new ParrotEmbed(author).setDescription('⚠️ | Você não forneceu um número!')).then(msg => msg.delete({ timeout: 30000 }))

        const selected = parseInt(message.content - 1)

        if (selected > 10) return channel.send(new ParrotEmbed(author).setDescription('⚠️ | Forneça um número menor ou igual a 10.')).then(msg => msg.delete({ timeout: 30000 }))

        player.addToQueue(tracks[selected], message.author)

        channel.send(new ParrotEmbed().setDescription(`<:music:708136949189443645> | Adicionado na playlist: **${tracks[selected].info.title}**`))

        msg.delete()

        if (!player.playing) return player.play()
      })
  }
}
