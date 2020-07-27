const { Command, ParrotEmbed } = require('../../');

module.exports = class ResumeCommand extends Command {
  constructor(client) {
    super({
      name: 'resume',
      aliases: ['retomar'],
      category: 'Música',
      description: 'Retoma a música que estáva tocando.',
      utils: { voiceChannel: true }
    }, client)
  }

  async run({ message, author, client, channel, member }) {
    const player = this.client.music.players.get(message.guild.id);

    if (!player) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Não há músicas tocando no momento!"));

    if (player.voiceChannel !== member.voice.channel.id) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Você não está no mesmo canal que eu!"));

    if (player.paused) {
      message.channel.send(new ParrotEmbed() .setDescription("<:musicPlay:708136949755674654> | A música foi retomada."));
    	player.pause(false);
    } else {
       message.channel.send(new ParrotEmbed() .setDescription("⚠️ | Á música não está pausada."));
    };
  };
}