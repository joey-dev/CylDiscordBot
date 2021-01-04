import * as Discord from "discord.js";
import pkg from 'custom-env';
import Commands from './commands/commands.js';

class Cyl {
    constructor() {
        const client = new Discord.Client();

        const { env } = pkg;
        env('local');

        client.on('ready', () => {
            new Commands(client)
            console.log('bot is loaded!');
        })

        client.login(process.env.DISCORD_TOKEN);
    }
}

new Cyl();
