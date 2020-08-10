const Parrot = require('./src/Parrot')
const client = new Parrot()
require('dotenv').config()

client
  .initializeLoaders()
  .login(process.env.DISCORD_TOKEN)
