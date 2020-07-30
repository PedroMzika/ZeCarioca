const { Command, ParrotEmbed } = require('../../');

module.exports = class StopCommand extends Command {
  constructor(client) {
    super({
      name: "stop",
      aliases: ["leave", "quit"],
      category: "Música",
      description: "Para a música que está tocando.",
      usage: "stop",
      utils: { voiceChannel: true }
    }, client)
  }

  async run({ message, author, client, channel, member }) {
    const player = this.client.music.players.get(message.guild.id);

    if (player.voiceChannel !== member.voice.channel.id) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Você não está no mesmo canal que eu!"));
    
    if (author.id == player.track.info.requester.id || author.id == player.dj.id) {
      player.destroy();
      channel.send(new ParrotEmbed() .setDescription("<:musicEject:708136949365473340> | Saindo do canal de voz."));
    } else {
      return channel.send(new ParrotEmbed() .setDescription("⚠️ | Você não é o DJ/requester deste(a) canal/música."));
    }     
  };
}
