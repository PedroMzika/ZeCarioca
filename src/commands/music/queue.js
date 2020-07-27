const { Command, ParrotEmbed } = require('../../');
const { Utils } = require("erela.js");

module.exports = class QueueCommand extends Command {
  constructor(client) {
    super({
      name: 'queue',
      aliases: ['lista', 'fila', 'list', 'playlist', 'q'],
      category: 'Música',
      description: 'Informa as música que irão tocar, e a que está tocando.',
      utils: { voiceChannel: true }
    }, client)
  }

  async run({ message, author, client, channel, member }) {

    const player = this.client.music.players.get(message.guild.id);

    if (!player) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Não há músicas tocando no momento!"));

    if (player.voiceChannel !== member.voice.channel.id) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Você não está no mesmo canal que eu!"));

    let index = 0;
    const serverQueue = this.client.music.players.get(message.guild.id).queue;

    message.channel.send(new ParrotEmbed() .setTitle(`Tocando agora: \`${player.queue[0].info.title}\``) .setDescription(`${serverQueue.map(a => `\`${++index}.\` **${a.info.title}**`).join("\n")}`))
  };
}