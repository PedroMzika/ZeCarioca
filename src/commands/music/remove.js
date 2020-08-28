const { Command, ParrotEmbed } = require('../../')

module.exports = class RemoveCommand extends Command {
  constructor (client) {
    super({
      name: 'removemusic',
      aliases: ['rm', 'remove'],
      category: 'Música',
      description: 'Tira uma música da lista.',
      usage: 'remove <número inteiro>',
      utils: { voiceChannel: true }
    }, client)
  }

  async run ({ message, author, channel, member }, args) {
    const player = this.client.music.players.get(message.guild.id)

    if (!player || player.queue.length <= 0) return channel.send(new ParrotEmbed(author).setDescription('⚠️ | Não há músicas tocando no momento!')).then(msg => msg.delete({ timeout: 30000 }))

    if (player.voiceChannel !== member.voice.channel.id) return channel.send(new ParrotEmbed(author).setDescription('⚠️ | Você não está no mesmo canal que eu!')).then(msg => msg.delete({ timeout: 30000 }))

    if (author.id === player.track.info.requester.id || author.id === player.dj.id) {
      if (isNaN(args[0])) return channel.send(new ParrotEmbed(author).setDescription('⚠️ | Coloque um **número** da música que quer pular!')).then(msg => msg.delete({ timeout: 30000 }))
      if (!args[0]) return channel.send(new ParrotEmbed(author).setDescription('⚠️ | Coloque o **número** da música que quer pular!')).then(msg => msg.delete({ timeout: 30000 }))
      if (args[0] > player.queue.length) return channel.send(new ParrotEmbed(author).setDescription('⚠️ | Não há essa quantidade de música na playlist!')).then(msg => msg.delete({ timeout: 30000 }))

      if (args[0] === 0) player.stop()

      player.queue.remove(args[0])
      channel.send(new ParrotEmbed(author).setDescription('<:musicFast:708136949143175239> | Música removida com sucesso!')).then(msg => msg.delete({ timeout: 30000 }))
    } else {
      return channel.send(new ParrotEmbed(author).setDescription('⚠️ | Você não é o DJ/requester deste(a) canal/música.')).then(msg => msg.delete({ timeout: 30000 }))
    }
  }
}
