const { Command, ParrotEmbed } = require('../../');
const { Utils } = require("erela.js");

module.exports = class SkipCommand extends Command {
  constructor(client) {
    super({
      name: 'skip',
      aliases: ['pular'],
      category: 'Música',
      description: 'Pula á musica atual para a seguinte.',
      utils: { voiceChannel: true }
    }, client)
  }

  async run({ message, author, client, channel, member }) {
    const player = this.client.music.players.get(message.guild.id);

    if (player.voiceChannel !== member.voice.channel.id) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Você não está no mesmo canal que eu!"));
    
    if (!player) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Não há músicas tocando no momento!"));
    
    if (player.voiceChannel !== member.voice.channel.id) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Você não está no mesmo canal que eu!"));

    if (author.id == player.track.info.requester.id || author.id == player.dj.id) {
      player.stop();
      message.channel.send(new ParrotEmbed() .setDescription("<:musicNext:708136949436645505> | A música foi pulada!")).then(msg => {
        msg.delete({ timeout: 30000 });
      });
    } else {
      return channel.send(new ParrotEmbed() .setDescription("⚠️ | Você não é o DJ/requester deste(a) canal/música."));
    }

  };
}