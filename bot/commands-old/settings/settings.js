import Permissions from '../../services/permissions.js';
import Commands from './commands/commands.js';
import Help from './help/help.js';

class Settings {
    static command(message, args, client) {
        if (Permissions.isAdmin(message.member)) {
            this.commandSwitch(message, args, client);
        }
    }

    static commandSwitch(message, args, client) {
        switch (args[1]) {
            case 'commands':
                Commands.command(message, args, client);
                break;
            case 'help':
            default:
                Help.command(message, args, client);
                break;
        }
    }
}

export default Settings;
