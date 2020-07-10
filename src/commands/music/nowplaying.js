const { Command, LexuroEmbed } = require('../../');
const { Utils } = require("erela.js");

module.exports = class NpCommand extends Command {
  constructor(client) {
    super({
      name: 'nowplaying',
      aliases: ['np', 'tocando'],
      category: 'Musica',
      description: 'Informa á música que está tocando.',
      utils: { voiceChannel: true }
    }, client)
  }

  async run({ message, author, client, channel }) {
    const player = this.client.music.players.get(message.guild.id);

    const NpEmbed = new LexuroEmbed()
      .setAuthor("Tocando Agora!")
      .addField(`Título:`, player.queue[0].info.title, false)
      .addField(`Autor:`, player.queue[0].info.author,false)
      .addField("Caso queira assistir:", `[clique aqui](${player.queue[0].info.uri})`, false)
      .addField("Duração:", Utils.formatTime(player.queue[0].info.length, true))
      .setThumbnail(`https://img.youtube.com/vi/${player.queue[0].info.identifier}/maxresdefault.jpg`)
    message.channel.send(NpEmbed);
  };
}