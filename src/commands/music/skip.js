const { Command, ParrotEmbed } = require("../../");

module.exports = class SkipCommand extends Command {
	constructor(client) {
		super({
			name: "skip",
			aliases: ["pular"],
			category: "Música",
			description: "Pula á musica atual para a seguinte.",
			usage: "skip",
			utils: { voiceChannel: true }
		}, client);
	}

	async run({ message, author, channel, member }) {
		const player = this.client.music.players.get(message.guild.id);
		
		if (!player) return channel.send(new ParrotEmbed(author) .setDescription("⚠️ | Não há músicas tocando no momento!"));
		
		if (player.voiceChannel !== member.voice.channel.id) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Você não está no mesmo canal que eu!"));

		if (author.id == player.track.info.requester.id || author.id == player.dj.id) {
			player.stop();
			return message.channel.send(new ParrotEmbed(author) .setDescription("<:musicNext:708136949436645505> | A música foi pulada!")).then(msg => {
				msg.delete({ timeout: 30000 });
			});
		}

		if (player.track.info.votesSkip.includes(author.id)) {
			return channel.send(new ParrotEmbed(author) .setDescription("⚠️ | Você já votou!"));
		} else {
			player.track.info.votesSkip.push(author.id);

			channel.send(new ParrotEmbed(author) .setDescription(`<:musicNext:708136949436645505> | Você votou, a votação atual está em: ${player.track.info.votesSkip.length}/3!`));
		}
		
		if (player.track.info.votesSkip.length >= 3) {
			player.stop();
			return channel.send(new ParrotEmbed(author) .setDescription("<:musicNext:708136949436645505> | A música foi pulada!")).then(msg => {
				msg.delete({ timeout: 30000 });
			});
		} 
	}
};