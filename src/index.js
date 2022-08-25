require('dotenv').config();

const { GatewayIntentBits } = require('discord.js');
const NezukoClient = require('./library/NezukoClient');

const client = new NezukoClient({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences] });

client.login(process.env.DISCORD_TOKEN);