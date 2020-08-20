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

    if (player.queue.length <= 0 || !player) return channel.send(new ParrotEmbed(author).setDescription('⚠️ | Não há músicas tocando no momento!')).then(msg => msg.delete({ timeout: 15000 }))

    if (player.voiceChannel !== member.voice.channel.id) return channel.send(new ParrotEmbed(author).setDescription('⚠️ | Você não está no mesmo canal que eu!')).then(msg => msg.delete({ timeout: 15000 }))

    let index = 0
    const serverQueue = this.client.music.players.get(message.guild.id).queue

    message.channel.send(new ParrotEmbed(author).setTitle(`Tocando agora: \`${player.queue[0].info.title}\``).setDescription(`${serverQueue.map(a => `\`${++index}.\` **${a.info.title}**`).join('\n')}`)).then(msg => msg.delete({ timeout: 15000 }))
  }
}
