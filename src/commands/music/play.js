const { Command, ParrotEmbed } = require('../../')
const { loadTypes } = require('../../utils/music')

module.exports = class PlayCommand extends Command {
  constructor (client) {
    super(
      {
        name: 'play',
        aliases: ['tocar', 'p'],
        category: 'Música',
        description: 'Reproduza a sua música favorita no Discord.',
        utils: { voiceChannel: true },
        usage: 'play <música/link/identifier>'
      },
      client
    )
  }

  async run ({ message, channel, member, author }, args) {
    const memberChannel = member.voice.channel.id

    const player = await this.client.music.join({
      guild: message.guild.id,
      voiceChannel: memberChannel,
      textChannel: channel,
      dj: author
    }, { selfDeaf: true })

    if (player.voiceChannel !== memberChannel) return channel.send(new ParrotEmbed(author).setDescription('⚠️ | Você não está no mesmo canal que eu!')).then(msg => msg.delete({ timeout: 15000 }))

    loadTypes(player, channel, author, args.join(' '))
  }
}
