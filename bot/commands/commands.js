import Settings from '../services/settings.js';
import Server from './server/server.js';


class Commands {
    constructor(client) {
        client.on('message', message => {
            const serverId = message.guild.id;

            const commandPrefix = Settings.getCommandPrefix(serverId);

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
        }
    }
}

export default Commands;
