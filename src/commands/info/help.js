const { Command, ParrotEmbed } = require('../../');

module.exports = class HelpCommand extends Command {
  constructor(client) {
    super({
      name: 'help',
      aliases: ['ajuda'],
      category: 'Info',
      description: 'Mostra os comandos do bot, e algumas coisas a mais.'
    }, client)
  }

  run({ message, author, client, channel }) {
    const filterCommands = (category) => (command) => command.category === category

    const HelpEmbed = new ParrotEmbed(author)
      .setTitle(`Atualmente o bot contem: ${this.client.commands.size} comandos!`)
      .addField(`Comandos do Bot: ${this.client.commands.filter(filterCommands("Bot")).size}`, this.client.commands.filter(filterCommands("Bot")).map(c => `\`${c.name}\``).join(',\n'))
			.addField(`Comandos de Desenvolvedores: ${this.client.commands.filter(filterCommands("Developer")).size}`, this.client.commands.filter(filterCommands("Developer")).map(c => `\`${c.name}\``).join(",\n"))
			.addField(`Comandos de Informação: ${this.client.commands.filter(filterCommands("Info")).size}`, this.client.commands.filter(filterCommands("Info")).map(c => `\`${c.name}\``).join(",\n"))
			.addField(`Comandos de Música: ${this.client.commands.filter(filterCommands("Musica")).size}`, this.client.commands.filter(filterCommands("Musica")).map(c => `\`${c.name}\``).join(",\n"))
    channel.send(HelpEmbed);

  };
}