import * as Discord from "discord.js";
import pkg from 'custom-env';
import Commands from './commands/commands.js';
import Modules from './modules/modules.js';

class Cyl {
    constructor() {
        const client = new Discord.Client();

        const { env } = pkg;
        env('local');

        client.on('ready', () => {
            new Commands(client)
            new Modules(client)
            console.log('bot is ready to be used ;)');
        })

        client.login(process.env.DISCORD_TOKEN);
    }
}

new Cyl();
