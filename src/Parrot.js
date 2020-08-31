const { Client } = require('discord.js')
const { EventLoader, CommandLoader } = require('./loaders')

module.exports = class Parrot extends Client {
  constructor () {
    super('client')
  }

  login (token) {
    super.login(token)
  }

  initializeLoaders () {
    new CommandLoader(this).build({ dir: 'commands' })
    new EventLoader(this).build()

    return this
  }
}
