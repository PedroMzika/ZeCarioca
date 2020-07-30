const { Command, ParrotEmbed } = require("../../");

module.exports = class PauseCommand extends Command {
	constructor(client) {
		super({
			name: "pause",
			aliases: ["pausar"],
			category: "Música",
			description: "Pausa à música que está reproduzindo.",
			usage: "pause",
			utils: { voiceChannel: true }
		}, client);
	}

	async run({ message, author, channel, member }) {
		const player = this.client.music.players.get(message.guild.id);

		if (!player) return channel.send(new ParrotEmbed(author) .setDescription("⚠️ | Não há músicas tocando no momento!"));

		if (player.voiceChannel !== member.voice.channel.id) return channel.send(new ParrotEmbed(author) .setDescription("⚠️ | Você não está no mesmo canal que eu!"));

		if (!player.paused) {
			message.channel.send(new ParrotEmbed(author) .setDescription("<:musicPause:708136948966883350> | A música foi pausada."));
			player.pause(true);
		} else {
			message.channel.send(new ParrotEmbed(author) .setDescription("⚠️ | Á música já está pausada."));
		}
	}
};