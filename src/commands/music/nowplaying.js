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

    if (!player || player.queue.length <= 0) return channel.send(new ParrotEmbed().setDescription('⚠️ | Não há músicas tocando no momento!')).then(msg => msg.delete({ timeout: 15000 }))

    if (player.voiceChannel !== member.voice.channel.id) return channel.send(new ParrotEmbed().setDescription('⚠️ | Você não está no mesmo canal que eu!')).then(msg => msg.delete({ timeout: 15000 }))

    const NpEmbed = new ParrotEmbed(author)
      .setAuthor('Tocando Agora!')
      .addField('Título:', player.queue[0].info.title, false)
      .addField('Autor:', player.queue[0].info.author, false)
      .addField('Caso queira assistir:', `[clique aqui](${player.queue[0].info.uri})`, false)
      .addField('Duração:', formatTime(player.queue[0].info.length), true)
      .setThumbnail(`https://img.youtube.com/vi/${player.queue[0].info.identifier}/maxresdefault.jpg`)
    channel.send(NpEmbed).then(msg => msg.delete({ timeout: 15000 }))
  }
}
