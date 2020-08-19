const { Command, ParrotEmbed } = require('../../')

module.exports = class SearchCommand extends Command {
  constructor (client) {
    super(
      {
        name: 'search',
        aliases: ['procurar'],
        category: 'Música',
        description: 'Procure e reproduza a sua música favorita no Discord.',
        utils: { voiceChannel: true },
        usage: 'search <nome da música>; <número>'
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

    if (player.voiceChannel !== memberChannel) return channel.send(new ParrotEmbed(author).setDescription('⚠️ | Você não está no mesmo canal que eu!'))

    const { tracks } = await this.client.music.fetchTracks(args.join(' '))

    console.log(tracks.map(song => song.info.title));

    // eslint-disable-next-line no-unused-vars
    /*const collector = channel.createMessageCollector(member => member.author.id === message.author.id, { time: 30000, max: 1 })
      .on('collect', message => {
        const selected = parseInt(message.content)
        if (isNaN(selected)) return channel.send(new ParrotEmbed(author).setDescription('⚠️ | Você não forneceu um número!'))
        player.addToQueue(tracks[selected], message.author)
        if (!player.playing) return player.play()
      })*/
  }
}
