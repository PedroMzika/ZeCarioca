const { Client } = require('discord.js');
const { EventLoader, CommandLoader } = require('./loaders')

module.exports = class Lexuro extends Client {
  /**
   * @constructor
   */
   constructor() {
     super('client');
    }

   /**
    * @function
    * @param {process} token Token do bot. 
    */

    login(token) {
      super.login(token);
    }

    initializeLoaders() {
      new CommandLoader(this).build({ dir: 'commands'});
      new EventLoader(this).build();
    }
}
