const fs = require('node:fs');
const path = require('node:path');

const StatsD = require('hot-shots')
const db = require('./MongoConnector')
const { Client, Collection } = require('discord.js');

class NezukoClient extends Client {

    constructor(options = {}) {
        super(options);

        this.commands = new Collection();

        this.stats = new StatsD();

        this.db = null;
    }


    async login(token) {
        const commandsPath = path.join(process.cwd(), 'src', 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        const eventsPath = path.join(process.cwd(), 'src', 'events');
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            this.commands.set(command.data.name, command);
        }

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const event = require(filePath);
            if (event.once) {
                this.once(event.name, (...args) => event.execute(...args));
            } else {
                this.on(event.name, (...args) => event.execute(...args));
            }
        }

        this.db = await db(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/nezuko?retryWrites=true&w=majority`)

        return super.login(token)
    }

}

module.exports = NezukoClient