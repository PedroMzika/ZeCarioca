const { Command, ParrotEmbed } = require('../../');
const { Utils } = require("erela.js");

module.exports = class QueueCommand extends Command {
  constructor(client) {
    super({
      name: 'queue',
      aliases: ['lista', 'fila', 'list'],
      category: 'Musica',
      description: 'Informa as música que irão tocar, e a que está tocando.',
      utils: { voiceChannel: true }
    }, client)
  }

  async run({ message, author, client, channel }) {
    const player = this.client.music.players.get(message.guild.id);

    let index = 0;
    const serverQueue = this.client.music.players.get(message.guild.id).queue;

    message.channel.send(new ParrotEmbed() .setTitle(`Tocando agora: \`${player.queue[0].info.title}\``) .setDescription(`${serverQueue.map(a => `\`${++index}.\` **${a.info.title}**`).join("\n")}`))
  };
}