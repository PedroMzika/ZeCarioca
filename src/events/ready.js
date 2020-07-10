const { GorilinkManager } = require('gorilink')
const { LexuroEmbed } = require('../');
const { CariocaPlayer } = require("../structures/music")

const nodes = [
  { 
    tag: 'Node 1',
    host: '13.84.216.222',
    port: 2334,
    password: "zecariocaLavaink",
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
      player.textChannel.send(new LexuroEmbed().setDescription(`<:music:708136949189443645> | Tocando agora: **${track.info.title}**`))
    })
  }
};