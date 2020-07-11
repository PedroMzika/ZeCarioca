const Command = require('../../structures/command/Command');
const { ParrotEmbed } = require('../../')

module.exports = class LoopCommand extends Command {
  	constructor(client) {
    	super(
      	{
        	name: 'loop',
        	aliases: ['repetir'],
        	category: 'Musica',
        	description: 'O player ira repetir a música atual.',
        	utils: { voiceChannel: true }
      	},
      	client
    	);
  	}

  	async run({ message, client, channel, member }, args) {
      
    const player = this.client.music.players.get(message.guild.id);

		if (typeof player.looped !== 'boolean') player.looped = false;

    	const { type, enabled } = player.looped ? ({ type: 0, enabled: false }) : ({ type: 1, enabled: true });

    	channel.send(new ParrotEmbed() .setDescription(`<:musicRepeat:708136949285650463> | O loop foi ${enabled ? '`ligado`' : '`desligado`'}!`));

    	player.loop(type);

    	player.looped = enabled;
	}
}