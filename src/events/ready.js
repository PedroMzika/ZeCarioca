const { GorilinkManager } = require('gorilink')
const { ParrotEmbed } = require('../');
const { CariocaPlayer } = require("../structures/music")
require("dotenv").config();

const nodes = [
  { 
    tag: 'Node 1',
    host: process.env.LAVALINK_HOST,
    port: process.env.LAVALINK_PORT,
    password: process.env.LAVALINK_PASSWORD,
  }
]

module.exports = class Ready {
  constructor(client) {
    this.client = client;
  }

  async event(ready) {
    console.info(`[${this.client.user.username}] iniciada com sucesso!`);
    
    this.client.music = new GorilinkManager(this.client, nodes, {
    	Player: CariocaPlayer
    })
    .on('nodeConnect', node => {
      console.log(`${node.tag || node.host} - Lavalink conectado com sucesso!`)
    })
    .on('trackStart', async (player, track) => {
      player.textChannel.send(new ParrotEmbed().setDescription(`<:music:708136949189443645> | Tocando agora: **${track.info.title}**`))
    })
  }
};