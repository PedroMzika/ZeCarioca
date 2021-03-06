const { Command, ParrotEmbed } = require('../../')
const { formatTime } = require('../../utils/music')
module.exports = class NpCommand extends Command {
  constructor (client) {
    super({
      name: 'nowplaying',
      aliases: ['np', 'tocando'],
      category: 'Música',
      description: 'Informa á música que está tocando.',
      usage: 'nowplaying',
      utils: { voiceChannel: true }
    }, client)
  }

  async run ({ message, author, channel, member }) {
    const player = this.client.music.players.get(message.guild.id)

    if (!player || player.queue.length <= 0) return channel.sendTimeout(new ParrotEmbed().setDescription('⚠️ | Não há músicas tocando no momento!'))

    if (player.voiceChannel !== member.voice.channel.id) return channel.sendTimeout(new ParrotEmbed().setDescription('⚠️ | Você não está no mesmo canal que eu!'))

    const NpEmbed = new ParrotEmbed(author)
      .setAuthor('Tocando Agora!')
      .addField('Título:', player.queue[0].info.title, false)
      .addField('Autor:', player.queue[0].info.author, false)
      .addField('Caso queira assistir:', `[clique aqui](${player.queue[0].info.uri})`, false)
      .addField('Duração:', formatTime(player.queue[0].info.length), true)
      .addField('Requisitado por:', `${player.queue[0].info.requester.username}#${player.queue[0].info.requester.discriminator}`)
      .setThumbnail(`https://img.youtube.com/vi/${player.queue[0].info.identifier}/maxresdefault.jpg`)
    channel.sendTimeout(NpEmbed)

    message.channel.reactMessage(player.textChannel.lastMessageID)
  }
}
