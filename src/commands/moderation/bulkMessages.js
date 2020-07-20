const { Command, ParrotEmbed } = require('../../');

module.exports = class AvatarCommand extends Command {
	constructor(client) {
		super({
			name: 'delete',
			category: 'Moderation',
			aliases: ['clear', 'clean', 'bulkMessages'],
			description: 'Apaga uma determinada quantidade de mensagens.'
		}, client)
	}

 	async run ({ message, channel }, args) {
 		if (!message.member.hasPermission("MANAGE_MESSAGES")) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Você não tem permissão para apagar mensagens!"));

		const msgDel = args[0];
		if (isNaN(msgDel)) return channel.send(new ParrotEmbed() .setDescription("⚠️ | Insira um número inteiro!"));
		const numberMessages = parseInt(msgDel);

		channel.messages.fetch({ limit: numberMessages }).then(messages => {
			message.channel.bulkDelete(messages);
		});

		channel.send(new ParrotEmbed() .setDescription(`🥳 | Eu consegui apagar ${msgDel} mensagens!`)).then(msg => msg.delete({ timeout: 30000 }));
	}  
};
