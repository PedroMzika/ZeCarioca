const { Command, ParrotEmbed } = require("../../");

module.exports = class AvatarCommand extends Command {
	constructor(client) {
		super({
			name: "delete",
			category: "Moderação",
			aliases: ["clear", "clean", "bulkMessages"],
			description: "Apaga uma determinada quantidade de mensagens.",
			usage: "delete <número de mensagens>"
		}, client);
	}

	async run ({ message, channel, author }, args) {
		if (!message.member.hasPermission("MANAGE_MESSAGES")) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Você não tem permissão para apagar mensagens!"));

		const msgDel = args[0];
		if (isNaN(msgDel)) return channel.send(new ParrotEmbed(author) .setDescription("⚠️ | Insira um número inteiro!"));
		const numberMessages = Math.floor(parseInt(msgDel));

		if (numberMessages <= 0) return channel.send(new ParrotEmbed(author) .setDescription("⚠️ | Insira um número positivo!"));

		channel.messages.fetch({ limit: numberMessages }).then(messages => {
			message.channel.bulkDelete(messages);
		});

		channel.send(new ParrotEmbed(author) .setDescription(`🥳 | Eu consegui apagar ${numberMessages} ${numberMessages > 1 ? "mensagens" : "mensagem"}!`)).then(msg => msg.delete({ timeout: 30000 }));
	}  
};
