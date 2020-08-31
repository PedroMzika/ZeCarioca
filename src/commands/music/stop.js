const { Command, ParrotEmbed } = require('../../')

module.exports = class StopCommand extends Command {
  constructor (client) {
    super({
      name: 'stop',
      aliases: ['leave', 'quit'],
      category: 'Música',
      description: 'Para a música que está tocando.',
      usage: 'stop',
      utils: { voiceChannel: true }
    }, client)
  }

  async run ({ message, author, channel, member }) {
    const player = this.client.music.players.get(message.guild.id)

    const stopEmbed = new ParrotEmbed(author)

    if (!player || player.queue.length <= 0) return channel.sendTimeout(stopEmbed.setDescription('⚠️ | Não há músicas tocando no momento!')).then(msg => msg.delete({ timeout: 30000 }))

    if (player.voiceChannel !== member.voice.channel.id) return channel.sendTimeout(stopEmbed.setDescription('⚠️ | Você não está no mesmo canal que eu!')).then(msg => msg.delete({ timeout: 30000 }))

    if (author.id === player.track.info.requester.id || author.id === player.dj.id) {
      player.destroy()
      channel.sendTimeout(stopEmbed.setDescription('<:musicEject:708136949365473340> | Saindo do canal de voz.')).then(msg => msg.delete({ timeout: 30000 }))
    } else {
      return channel.sendTimeout(stopEmbed.setDescription('⚠️ | Você não é o DJ/requester deste(a) canal/música.')).then(msg => msg.delete({ timeout: 30000 }))
    }
  }
}
