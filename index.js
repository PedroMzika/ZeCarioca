const { config } = require('dotenv');

config(); // Run dotenv configuration.

const Pereira = require('./src/Pereira');
const client = new Pereira()

client.initializeLoaders();

client.login(process.env.DISCORD_TOKEN)