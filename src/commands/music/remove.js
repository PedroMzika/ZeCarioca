const { Command, ParrotEmbed } = require('../../');
const { Utils } = require("erela.js");

module.exports = class QueueCommand extends Command {
  constructor(client) {
    super({
      name: "removemusic",
      aliases: ["rm", "remove"],
      category: "Música",
      description: "Tira uma música da lista.",
      usage: "remove <número inteiro>",
      utils: { voiceChannel: true }
    }, client)
  }

  async run({ message, author, client, channel, member }, args) {
    const player = this.client.music.players.get(message.guild.id);

    if (!player) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Não há músicas tocando no momento!"));

    if (player.voiceChannel !== member.voice.channel.id) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Você não está no mesmo canal que eu!"));
    
    if (author.id == player.track.info.requester.id || author.id == player.dj.id) {

      if (isNaN(args[0])) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Coloque um **número** da música que quer pular!"));
      if (!args[0]) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Coloque o **número** da música que quer pular!"));
      if (args[0] > player.queue.length) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Não há essa quantidade de música na playlist!"));

      if (args[0] === 0) player.stop();

      player.queue.remove(args[0]);
      channel.send(new ParrotEmbed() .setDescription("<:musicFast:708136949143175239> | Música removida com sucesso!"));
    } else {
      return channel.send(new ParrotEmbed() .setDescription("⚠️ | Você não é o DJ/requester deste(a) canal/música."));
    }
      
  };
}