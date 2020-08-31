const { Command, ParrotEmbed } = require('../../')

module.exports = class QueueCommand extends Command {
  constructor (client) {
    super({
      name: 'queue',
      aliases: ['lista', 'fila', 'q'],
      category: 'Música',
      description: 'Informa as música que irão tocar, e a que está tocando.',
      usage: 'queue',
      utils: { voiceChannel: true }
    }, client)
  }

  async run ({ message, author, channel, member }) {
    const player = this.client.music.players.get(message.guild.id)

    const queueEmbed = new ParrotEmbed(author)

    if (!player || player.queue.length <= 0) return channel.sendTimeout(queueEmbed.setDescription('⚠️ | Não há músicas tocando no momento!'))

    if (player.voiceChannel !== member.voice.channel.id) return channel.sendTimeout(queueEmbed.setDescription('⚠️ | Você não está no mesmo canal que eu!'))

    let index = 0
    const serverQueue = this.client.music.players.get(message.guild.id).queue

    message.channel.sendTimeout(queueEmbed.setTitle(`Tocando agora: \`${player.queue[0].info.title}\``).setDescription(`${serverQueue.map(a => `\`${++index}.\` **${a.info.title}** - *${a.info.requester.username}#${a.info.requester.discriminator}*`).join('\n')}`))
  }
}
