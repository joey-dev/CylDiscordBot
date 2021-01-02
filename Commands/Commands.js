import Test from './Test/Test.js';
import Settings from './Settings/Settings.js';
import Event from './Event/Event.js';
import fs from 'fs';

class Commands {
    constructor(client) {
        client.on('message', message => {
            const serverId = message.guild.id;

            const generalSettingsJson = fs.readFileSync('Data/' + serverId + '/Settings/general.json');
            const generalSettings = JSON.parse(generalSettingsJson);

            if (!message.content.startsWith(generalSettings['commandPrefix']) || message.author.bot) return;

            const args = message.content.slice(generalSettings['commandPrefix'].length).trim().split(' ');
            const fullCommand = args.shift().toLowerCase();
            const directory = fullCommand.split('-', 1)[0];
            const command = fullCommand.replace(directory + '-', '', 1);

            this.commandSwitchCase(directory, command, message, args, client);
        });
    }

    commandSwitchCase(directory, command, message, args, client) {
        switch (directory) {
            case 'ping':
                message.reply("pong");
                break;
            case 'test':
                new Test(command, message, args, client);
                break;
            case 'settings':
                new Settings(command, message, args, client);
                break;
            case 'event':
                new Event(command, message, args, client);
                break;
        }
    }
}

export default Commands;
