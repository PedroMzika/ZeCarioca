const { Command, ParrotEmbed } = require('../../');

module.exports = class BassBoostCommand extends Command {
  constructor(client) {
    super({
      name: "bassboost",
      aliases: ["bass", "bb"],
      category: "Música",
      description: "Aumenta os graves da música.",
      utils: { voiceChannel: true }
    }, client)
  }

  async run({ message, author, client, channel, member }) {
    const player = this.client.music.players.get(message.guild.id);

    if (!player) return channel.send(new LexuroEmbed() .setDescription("⚠️ | Não há nenhum player tocando no momento."));

    if (player.voiceChannel !== member.voice.channel.id) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Você não está no mesmo canal que eu!"));
    
    if (typeof player.bassboost !== 'boolean') player.bassboost = false;

    const { type, enabled } = player.bassboost ? ({ type: 0, enabled: false }) : ({ type: 1, enabled: true });

    channel.send(new ParrotEmbed() .setDescription(`<:musicSettings:708136949487239198> | O Bassboost foi definido como ${enabled ? '`ligado`' : '`desligado`'}!`));

    player.setEQ(Array(6).fill(0).map((n, i) => ({ band: i, gain: type })));

    player.bassboost = enabled;
  };
}