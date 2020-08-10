const { Command, ParrotEmbed } = require('../../')
const { Utils } = require('erela.js')

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

    if (player.queue.length <= 0 || !player) return channel.send(new ParrotEmbed().setDescription('⚠️ | Não há músicas tocando no momento!'))

    if (player.voiceChannel !== member.voice.channel.id) return channel.send(new ParrotEmbed().setDescription('⚠️ | Você não está no mesmo canal que eu!'))

    const NpEmbed = new ParrotEmbed(author)
      .setAuthor('Tocando Agora!')
      .addField('Título:', player.queue[0].info.title, false)
      .addField('Autor:', player.queue[0].info.author, false)
      .addField('Caso queira assistir:', `[clique aqui](${player.queue[0].info.uri})`, false)
      .addField('Duração:', Utils.formatTime(player.queue[0].info.length, true))
      .setThumbnail(`https://img.youtube.com/vi/${player.queue[0].info.identifier}/maxresdefault.jpg`)
    message.channel.send(NpEmbed)
  }
}
