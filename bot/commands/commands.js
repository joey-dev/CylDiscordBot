import {Settings as SettingsService} from '../services/settings.js';
import Server from './server/server.js';
import Settings from './settings/settings.js';


class Commands {
    constructor(client) {
        client.on('message', message => {
            const serverId = message.guild.id;

            const commandPrefix = SettingsService.getCommandPrefix(serverId);

            if (!message.content.startsWith(commandPrefix) || message.author.bot) return;

            const args = message.content.slice(commandPrefix.length).trim().split(' ');

            this.commandSwitchCase(message, args, client);
        });
    }

    commandSwitchCase(message, args, client) {
        switch (args[0]) {
            case 'server':
                Server.command(message, args, client);
                break;
            case 'settings':
                Settings.command(message, args, client);
                break;
        }
    }
}

export default Commands;
