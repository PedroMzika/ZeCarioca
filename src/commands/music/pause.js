const { Command, ParrotEmbed } = require('../../');

module.exports = class PauseCommand extends Command {
  constructor(client) {
    super({
      name: 'pause',
      aliases: ['pausar'],
      category: 'Musica',
      description: 'Pausa à música que está reproduzindo.',
      utils: { voiceChannel: true }
    }, client)
  }

  async run({ message, author, client, channel }) {
    const player = this.client.music.players.get(message.guild.id);

    if (!player.paused) {
      message.channel.send(new ParrotEmbed() .setDescription("<:musicPause:708136948966883350> | A música foi pausada."));
      player.pause(true);
    } else {
      message.channel.send(new ParrotEmbed() .setDescription("⚠️ | Á música já está pausada."));
    }; 
  };
}