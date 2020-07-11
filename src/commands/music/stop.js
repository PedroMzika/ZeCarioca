const { Command, ParrotEmbed } = require('../../');

module.exports = class StopCommand extends Command {
  constructor(client) {
    super({
      name: 'stop',
      aliases: ['leave', 'quit'],
      category: 'Música',
      description: 'Para a música que está tocando.',
      utils: { voiceChannel: true }
    }, client)
  }

  async run({ message, author, client, channel }) {
    const player = this.client.music.players.get(message.guild.id);

    player.destroy();
    this.client.music.leave(message.guild.id);
    channel.send(new ParrotEmbed() .setDescription("<:musicEject:708136949365473340> | Saindo do canal de voz."))
  };
}