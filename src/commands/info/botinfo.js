const { Command, ParrotEmbed } = require('../../');
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

    message.channel.send(new ParrotEmbed() .setDescription("Em breve mais informações 👍") .addField("Convite sem permissão:", "[Clique aqui](https://discord.com/api/oauth2/authorize?client_id=721849985343422505&permissions=0&scope=bot)") .addField("Convite com permissão:", "[Clique aqui](https://discord.com/api/oauth2/authorize?client_id=721849985343422505&permissions=8&scope=bot)"));

  };
}