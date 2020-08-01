const { Command, ParrotEmbed } = require("../../");


module.exports = class LoopCommand extends Command {
	constructor(client) {
		super(
			{
				name: "loop",
				aliases: ["repetir"],
				category: "Música",
				description: "O player ira repetir a música atual.",
				usage: "loop",
				utils: { voiceChannel: true }
			}, client);
	}

	async run({ message, channel, member, author }) {

		const player = this.client.music.players.get(message.guild.id);

		if (!player.queue.length <= 0) return channel.send(new ParrotEmbed(author) .setDescription("⚠️ | Não há músicas tocando no momento!"));

		if (player.voiceChannel !== member.voice.channel.id) return channel.send(new ParrotEmbed(author) .setDescription("⚠️ | Você não está no mesmo canal que eu!"));

		if (typeof player.looped !== "boolean") player.looped = false;

		const { type, enabled } = player.looped ? ({ type: 0, enabled: false }) : ({ type: 1, enabled: true });

		channel.send(new ParrotEmbed(author) .setDescription(`<:musicRepeat:708136949285650463> | O loop foi ${enabled ? "`ligado`" : "`desligado`"}!`));

		player.loop(type);

		player.looped = enabled;
	}
};