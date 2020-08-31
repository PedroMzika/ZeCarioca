const { Command, ParrotEmbed } = require('../../')

module.exports = class SkipCommand extends Command {
  constructor (client) {
    super({
      name: 'skip',
      aliases: ['pular'],
      category: 'Música',
      description: 'Pula á musica atual para a seguinte.',
      usage: 'skip',
      utils: { voiceChannel: true }
    }, client)
  }

  async run ({ message, author, channel, member }) {
    const player = this.client.music.players.get(message.guild.id)

    const skipEmbed = new ParrotEmbed(author)

    if (!player || player.queue.length <= 0) return channel.sendTimeout(skipEmbed.setDescription('⚠️ | Não há músicas tocando no momento!')).then(msg => msg.delete({ timeout: 30000 }))

    if (player.voiceChannel !== member.voice.channel.id) return channel.sendTimeout(skipEmbed.setDescription('⚠️ | Você não está no mesmo canal que eu!')).then(msg => msg.delete({ timeout: 30000 }))

    if (author.id === player.track.info.requester.id || author.id === player.dj.id) {
      player.stop()
      return message.channel.sendTimeout(skipEmbed.setDescription('<:musicNext:708136949436645505> | A música foi pulada!')).then(msg => { msg.delete({ timeout: 30000 }) })
    }

    if (player.track.info.votesSkip.includes(author.id)) {
      return channel.sendTimeout(skipEmbed.setDescription('⚠️ | Você já votou!')).then(msg => msg.delete({ timeout: 30000 }))
    } else {
      player.track.info.votesSkip.push(author.id)

      channel.sendTimeout(skipEmbed.setDescription(`<:musicNext:708136949436645505> | Você votou, a votação atual está em: ${player.track.info.votesSkip.length}/3!`)).then(msg => msg.delete({ timeout: 30000 }))
    }

    if (player.track.info.votesSkip.length >= 3) {
      player.stop()
      return channel.sendTimeout(skipEmbed.setDescription('<:musicNext:708136949436645505> | A música foi pulada!')).then(msg => { msg.delete({ timeout: 30000 }) })
    }
  }
}
