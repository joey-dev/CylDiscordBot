import * as Discord from "discord.js";
import Commands from "./Commands/Commands.js";
import Passive from './Passive/Passive.js';
import StartCyl from './PreStartup/startCyl.js';
import Start from './Start/Start.js';

class Cyl {
    constructor() {
        new StartCyl((discordToken = false) => {
            const client = new Discord.Client();

            console.log("pre-startup finished");
            console.log("To change some of the settings, go to your bot settings channel and type in !settings");

            client.on('ready', () => {
                // new Start(client);
                // new Passive(client);
                new Commands(client);

                console.log('bot is loaded!');
            })

            if (discordToken === false) {
                client.login(process.env.DISCORD_TOKEN);
            } else {
                client.login(discordToken);
            }

        });
    }
}

new Cyl();
