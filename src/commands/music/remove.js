const { Command, ParrotEmbed } = require('../../');
const { Utils } = require("erela.js");

module.exports = class QueueCommand extends Command {
  constructor(client) {
    super({
      name: 'removemusic',
      aliases: ['rm'],
      category: 'Música',
      description: 'Tira uma música da lista.',
      utils: { voiceChannel: true }
    }, client)
  }

  async run({ message, author, client, channel }, args) {
    const player = this.client.music.players.get(message.guild.id)

    if (player) {
      if (isNaN(args[0])) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Coloque um **número** da música que quer pular!"));
      if (!args[0]) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Coloque o **número** da música que quer pular!"));
      if (args[0] > player.queue.length) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Não há essa quantidade de música na playlist!"));

      player.queue.remove(args[0]);
      channel.send(new ParrotEmbed() .setDescription("<:musicFast:708136949143175239> | Música removida com sucesso!"));
    } else {
      return channel.send(new ParrotEmbed() .setDescription("⚠️ | Não há músicas tocando!"));
    }
  };
}