const { config } = require('dotenv');

config(); // Run dotenv configuration.

const Parrot = require('./src/Parrot');
const client = new Pereira()

client.initializeLoaders();

client.login(process.env.DISCORD_TOKEN)