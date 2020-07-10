const CommandUtils = require('./CommandUtils')
const LexuroEmbed = require('../../utils/LexuroEmbed')

module.exports = class Command {
  constructor(options = {}, client) {
    this.client = client

    this.name = options.name || console.log('a');

    this.aliases = options.aliases || []
    this.category = options.category || 'Util'

    this.description = options.description || ''
    this.usage = options.usage || ''

    this.utils = options.utils 
  }
  
  async _run(context, args) {
    try {
      await this.build(context, args);

      await this.run(context, args);
    } catch (e) {
      this.error(context, e)
    }
  }

  run() {}

  error({ channel }, error) {
      const embed = new LexuroEmbed().setDescription(error.message).setColor('RED');

      return channel.send(embed);
  }

  build(context, args) {
    return this.utils ? CommandUtils.util(context, this.utils, args) : true
  };
}