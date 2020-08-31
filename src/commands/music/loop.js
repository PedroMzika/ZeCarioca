const { Command, ParrotEmbed } = require('../../')

module.exports = class LoopCommand extends Command {
  constructor (client) {
    super(
      {
        name: 'loop',
        aliases: ['repetir'],
        category: 'Música',
        description: 'O player ira repetir a música atual.',
        usage: 'loop <single/all/off>',
        utils: { voiceChannel: true }
      }, client)
  }

  async run ({ message, channel, member, author }, [option]) {
    const player = this.client.music.players.get(message.guild.id)

    const messageLoop = new ParrotEmbed(author)

    if (!player || player.queue.length <= 0) return channel.sendTimeout(messageLoop.setDescription('⚠️ | Não há músicas tocando no momento!'))

    if (player.voiceChannel !== member.voice.channel.id) return channel.sendTimeout(messageLoop.setDescription('⚠️ | Você não está no mesmo canal que eu!'))

    if (author.id !== player.track.info.requester.id || author.id !== player.dj.id) return channel.sendTimeout(messageLoop.setDescription('⚠️ | Você não é o DJ/requester deste(a) canal/música.'))

    switch (option.toLowerCase()) {
      case '1':
      case 'single': {
        player.loop(1)
        channel.sendTimeout(messageLoop.setDescription('<:musicRepeat:708136949285650463> | O loop foi definido para a música atual!'))
        break
      }

      case '2':
      case 'all': {
        player.loop(2)
        channel.sendTimeout(messageLoop.setDescription('<:musicRepeat:708136949285650463> | O loop foi definido para a queue inteira!'))
        break
      }

      case '0':
      case 'off': {
        player.loop(0)
        channel.sendTimeout(messageLoop.setDescription('<:musicRepeat:708136949285650463> | O loop foi desligado!'))
        break
      }
    }
  }
}
