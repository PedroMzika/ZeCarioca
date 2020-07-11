const { Command, LexuroEmbed } = require('../../');
const moment = require("moment");
moment.locale("pt-BR")
const dateNow = moment().format('LTS');

module.exports = class BotInfoCommand extends Command {
  constructor(client) {
    super({
      name: 'botinfo',
      aliases: ['infobot', "bi"],
      category: 'Info',
      description: 'Mostra as informações do bot.'
    }, client)
  }

  run({ message, author, client, channel }) {

    message.channel.send("em breve 👍");

  };
}