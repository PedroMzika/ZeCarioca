/**
 * Command Context created for best use
 */
module.exports = class CommandContext {
  /**
   * @constructor
   * @param {Object} options Context Options
   */
  constructor (options = {}) {
      this.client = options.client

      this.command = options.command
      this.message = options.message

      this.author = options.message.author
      this.member = options.message.member
      this.guild = options.message.guild
      this.voiceChannel = options.message.member.voice.channel

      this.channel = options.message.channel
      this.content = options.message.content
  }
}
