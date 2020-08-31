const { Command, ParrotEmbed } = require('../../')

module.exports = class VolumeCommand extends Command {
  constructor (client) {
    super({
      name: 'volume',
      aliases: ['vol'],
      category: 'Música',
      description: 'Defina o volume das músicas e veja o volume atual.',
      usage: 'volume [número até 250]',
      utils: { voiceChannel: true }

    }, client)
  }

  async run ({ message, author, channel, member }, args) {
    const player = this.client.music.players.get(message.guild.id)
    const volume = args[0]

    if (!player || player.queue.length <= 0) return channel.send(new ParrotEmbed(author).setDescription('⚠️ | Não há músicas tocando no momento!')).then(msg => msg.delete({ timeout: 30000 }))

    if (player.voiceChannel !== member.voice.channel.id) return channel.send(new ParrotEmbed(author).setDescription('⚠️ | Você não está no mesmo canal que eu!')).then(msg => msg.delete({ timeout: 30000 }))

    if (!volume) {
      message.channel.send(new ParrotEmbed(author).setDescription(`<:musicSettings:708136949487239198> | O volume atual está em: ${player.state.volume}%`)).then(msg => msg.delete({ timeout: 30000 }))
    } else if (isNaN(volume)) {
      message.channel.send(new ParrotEmbed(author).setDescription('⚠️ | Digite um `número` para definir.')).then(msg => msg.delete({ timeout: 30000 }))
    } else if (volume > 250) {
      message.channel.send(new ParrotEmbed(author).setDescription('⚠️ | Digite um `número` para **menor** que 250 para definir.')).then(msg => msg.delete({ timeout: 30000 }))
    } else {
      player.volume(volume)
      message.channel.send(new ParrotEmbed(author).setDescription(`<:musicSettings:708136949487239198> | O volume foi definido para: ${args[0]}%`)).then(msg => msg.delete({ timeout: 30000 }))
    }
  }
}
