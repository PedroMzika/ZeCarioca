const { Command, ParrotEmbed } = require('../../')

module.exports = class ResumeCommand extends Command {
  constructor (client) {
    super({
      name: 'resume',
      aliases: ['retomar'],
      category: 'Música',
      description: 'Retoma a música que estáva tocando.',
      usage: 'resume',
      utils: { voiceChannel: true }
    }, client)
  }

  async run ({ message, author, channel, member }) {
    const player = this.client.music.players.get(message.guild.id)

    if (!player || player.queue.length <= 0) return channel.send(new ParrotEmbed(author).setDescription('⚠️ | Não há músicas tocando no momento!')).then(msg => msg.delete({ timeout: 30000 }))

    if (player.voiceChannel !== member.voice.channel.id) return channel.send(new ParrotEmbed(author).setDescription('⚠️ | Você não está no mesmo canal que eu!')).then(msg => msg.delete({ timeout: 30000 }))

    if (player.paused) {
      message.channel.send(new ParrotEmbed(author).setDescription('<:musicPlay:708136949755674654> | A música foi retomada.')).then(msg => msg.delete({ timeout: 30000 }))
      player.pause(false)
    } else {
      message.channel.send(new ParrotEmbed(author).setDescription('⚠️ | Á música não está pausada.')).then(msg => msg.delete({ timeout: 30000 }))
    }
  }
}
