const { Command, LexuroEmbed } = require('../../');
const { Utils } = require("erela.js");

module.exports = class VolumeCommand extends Command {
  constructor(client) {
    super({
      name: 'volume',
      aliases: ['vol'],
      category: 'Musica',
      description: 'Defina o volume das músicas e veja o volume atual.',
      utils: { voiceChannel: true }
    }, client)
  }

  async run({ message, author, client, channel }, args) {
    const player = this.client.music.players.get(message.guild.id);
    const volume = args[0];

    if (!volume) {
      message.channel.send(new LexuroEmbed() .setDescription(`<:musicSettings:708136949487239198> | O volume atual está em: ${player.state.volume}%`))
    } else if (isNaN(volume)) {
      message.channel.send(new LexuroEmbed() .setDescription(`⚠️ | Digite um \`número\` para definir.`));
    } else if (volume > 250) {
      message.channel.send(new LexuroEmbed() .setDescription(`⚠️ | Digite um \`número\` para **menor** que 250 para definir.`));
    } else {
      player.volume(volume);
      message.channel.send(new LexuroEmbed() .setDescription(`<:musicSettings:708136949487239198> | O volume foi definido para: ${args[0]}%`));
    }
  };
}