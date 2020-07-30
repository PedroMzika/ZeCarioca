const { Command, ParrotEmbed } = require('../../');
const { inspect } = require('util');

module.exports = class EvalCommand extends Command {
  	constructor(client) {
      super({
        name: "eval",
        aliases: ["ex", "execute", "e"],
        category: "Developer",
        hidden: true,
        description: "Teste comandos e códigos!",
        usage: "eval <código>",
        utils: { devOnly: true }
      }, client)
  	}

  	async run({ channel, message }, args) {
    	if (message.content.includes("token")) return message.reply("are you stupid, or what?");
    	
    	try {
        	const input = args.join(" ");
        	let output = eval(input);
    
        	if (typeof output !== 'string')
        	output = require('util').inspect(output, { depth: 0 });
        	const embed = new ParrotEmbed()
            	.setAuthor('Eval')
            	.addField('Input', `\`\`\`js\n${input}\n\`\`\``)
            	.addField('Output',  `\`\`\`js\n${output}\n\`\`\``)
            	.setFooter(message.author.tag, this.client.user.displayAvatarURL)
            	.setTimestamp();   
        	message.channel.send(embed)
    	} catch(e) {
       		message.channel.send(e);
    	}
  	}
}

