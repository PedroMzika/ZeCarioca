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

    const removeQueue = new ParrotEmbed(author)

    if (!player || player.queue.length <= 0) return channel.sendTimeout(removeQueue.setDescription('⚠️ | Não há músicas tocando no momento!'))

    if (player.voiceChannel !== member.voice.channel.id) return channel.sendTimeout(removeQueue.setDescription('⚠️ | Você não está no mesmo canal que eu!'))

    if (author.id !== player.track.info.requester.id || author.id !== player.dj.id) return channel.sendTimeout(removeQueue.setDescription('⚠️ | Você não é o DJ/requester deste(a) canal/música.'))

    if (isNaN(args[0])) return channel.sendTimeout(removeQueue.setDescription('⚠️ | Coloque um **número** da música que quer pular!'))

    if (!args[0]) return channel.sendTimeout(removeQueue.setDescription('⚠️ | Coloque o **número** da música que quer pular!'))

    if (args[0] > player.queue.length) return channel.sendTimeout(removeQueue.setDescription('⚠️ | Não há essa quantidade de música na playlist!'))

    if (args[0] === 0) player.stop()

    player.queue.remove(args[0])

    channel.sendTimeout(removeQueue.setDescription('<:musicFast:708136949143175239> | Música removida com sucesso!'))
  }
}
