import Enabled from '../../services/api/commands/enabled.js';
import Data from './data/data.js';
import Help from './help/help.js';

class Server {
    static command(message, args, client) {
        this.isEnabled(message, (isEnabled) => {
            if (isEnabled) {

                if (!this.permissions(message)) {
                    return;
                }

                switch (args[1]) {
                    case 'data':
                        Data.command(message, args, client);
                        break;
                    default:
                        Help.command(message, args, client);
                        break;
                }
            }
        });
    }

    static isEnabled(message, callback) {
        const serverId = message.guild.id;

        Enabled.command("server", serverId, (isEnabled) => {
            callback(isEnabled)
        })
    }

    static permissions(message) {
        return true;
    }
}

export default Server;
