const { MessageEmbed } = require('discord.js');
const { EMBED_COLOR } = require('./Constants');

module.exports = class LexuroEmbed extends MessageEmbed {
  /**
   * @constructor
   * @param {user} user 
   */
  constructor(user) {
    super(user);

    this.setColor(EMBED_COLOR);
    if (user) this.setFooter(user.tag, user.displayAvatarURL()).setTimestamp();
  }
}