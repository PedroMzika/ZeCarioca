const thisDeveloper = require("../../utils/PermissionsUtils");

module.exports = class CommandUtils {
  /**
   * @function
   * @param {object} options Options of command
   */
  static parseOptions(options = {}) {
    return {
      devOnly: !!options.devOnly,
      voiceChannel: !!options.voiceChannel
    }
  }

  static util({ client, author, guild, voiceChannel }, opts = {}) {
    const options = this.parseOptions(opts);

    if (options.devOnly && !thisDeveloper(author.id)) {
      throw new Error('🚫 Somente meus desenvolvedores podem usar o comando!');
    }

    if (options.voiceChannel && !voiceChannel) {
      throw new Error('🚫 Por favor, entre um canal de voz!')
    }
  };
}

