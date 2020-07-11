const { Command, ParrotEmbed } = require('../../');

module.exports = class AvatarCommand extends Command {
	constructor(client) {
		super({
			name: 'avatar',
			category: 'Info',
			description: 'Mostra o avatar de um usuário ou seu próprio.'
		}, client)
	}

  async run ({ message, channel }, args) {
    let user = message.mentions.users.first() || this.client.users.cache.get(args[0]) || message.author;

    const avatarUrl = user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 });

    return channel.send(new ParrotEmbed() .setDescription(`Aqui está o avatar de: ${user.username}`) .setImage(avatarUrl));
  };
}