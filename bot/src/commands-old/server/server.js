import CheckPermissionsAndEnabled from '../../services/api/command/checkPermissionsAndEnabled.js';
import Data from './data/data.js';
import Help from './help/help.js';

class Server {
    static command(message, args, client) {
        CheckPermissionsAndEnabled.check("server", message, (isAllowed) => {
            if (isAllowed) {
                this.commandSwitch(message, args, client);
            }
        })
    }

    static commandSwitch(message, args, client) {
        switch (args[1]) {
            case 'data':
                Data.command(message, args, client);
                break;
            case 'help':
            default:
                Help.command(message, args, client);
                break;
        }
    }
}

export default Server;
