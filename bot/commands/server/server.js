import Enabled from '../../services/api/commands/enabled.js';
import Permissions from '../../services/api/commands/permissions.js';
import Data from './data/data.js';
import Help from './help/help.js';

class Server {
    static command(message, args, client) {
        this.isEnabled(message, (isEnabled) => {
            if (isEnabled) {
                this.gotPermissions(message, (gotPermissions) => {
                    if (gotPermissions) {
                        this.commandSwitch(message, args, client);
                    }
                });
            }
        });
    }

    static isEnabled(message, callback) {
        const serverId = message.guild.id;

        Enabled.command('server', serverId, (isEnabled) => {
            callback(isEnabled);
        });
    }

    static gotPermissions(message, callback) {
        Permissions.fromMessage(message, 'server', callback);
        return true;
    }

    static commandSwitch(message, args, client) {
        switch (args[1]) {
            case 'data':
                Data.command(message, args, client);
                break;
            default:
                Help.command(message, args, client);
                break;
        }
    }
}

export default Server;
