const { Command, ParrotEmbed } = require('../../')

module.exports = class SuggestionCommand extends Command {
  constructor (client) {
    super(
      {
        name: 'suggestion',
        aliases: ['sugestão', 'sugestao'],
        category: 'Bot',
        description: 'Envie uma sugestão para o bot.',
        usage: 'sugestão <sugestão>'
      }, client)
  }

  async run ({ message, author }, args) {
    const suggestionChannel = this.client.channels.cache.get('708145298018664479')

    const embed = new ParrotEmbed(author)
      .setDescription(args.join(' '))
      .setTitle(`Sugestão de: ${message.author.tag}`)
    suggestionChannel.send(embed)
  }
}
