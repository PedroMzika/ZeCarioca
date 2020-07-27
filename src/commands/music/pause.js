const { Command, ParrotEmbed } = require('../../');

module.exports = class PauseCommand extends Command {
  constructor(client) {
    super({
      name: 'pause',
      aliases: ['pausar'],
      category: 'Música',
      description: 'Pausa à música que está reproduzindo.',
      utils: { voiceChannel: true }
    }, client)
  }

  async run({ message, author, client, channel, member }) {
    const player = this.client.music.players.get(message.guild.id);

    if (!player) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Não há músicas tocando no momento!"));

    if (player.voiceChannel !== member.voice.channel.id) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Você não está no mesmo canal que eu!"));

    if (!player.paused) {
      message.channel.send(new ParrotEmbed() .setDescription("<:musicPause:708136948966883350> | A música foi pausada."));
      player.pause(true);
    } else {
      message.channel.send(new ParrotEmbed() .setDescription("⚠️ | Á música já está pausada."));
    }; 
  };
}