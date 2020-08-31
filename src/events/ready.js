const { GorilinkManager } = require('gorilink')
const { ParrotEmbed } = require('../')
const { CariocaPlayer } = require('../structures/music')
const { connect } = require('mongoose')

const nodes = JSON.parse(process.env.LAVALINKS)

module.exports = class Ready {
  constructor (client) {
    this.client = client
  }

  async event () {
    connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => err ? console.error(err) : console.log('Conectado ao Banco de Dados!'))

    console.info(`[${this.client.user.username}] iniciada com sucesso!`)

    this.client.music = new GorilinkManager(this.client, nodes, {
      Player: CariocaPlayer
    })
      .on('queueEnd', async player => {
        await player.textChannel.send(new ParrotEmbed().setDescription('<:musicStop:708136949214609500> | A lista de reprodução acabou! Saindo do canal.')).then(msg => msg.delete({ timeout: 15000 }))

        player.destroy()
      })
      .on('nodeConnect', node => {
        console.log(`${node.tag || node.host} - Lavalink conectado com sucesso!`)
      })
      .on('trackStart', async (player, track) => {
        player.textChannel.send(new ParrotEmbed().setDescription(`<:music:708136949189443645> | Tocando agora: **${track.info.title}**`)).then(msg => msg.delete({ timeout: 15000 }))
      })
  }
}
