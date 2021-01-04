import Enabled from './enabled.js';
import Permissions from './permissions.js';

class CheckPermissionsAndEnabled {
    static check(commandName, message, callback) {
        Enabled.command(commandName, message.guild.id, (isEnabled) => {
            if (isEnabled) {
                Permissions.fromMessage(message, commandName, (gotPermissions) => {
                    if (gotPermissions) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                });
            } else {
                callback(false);
            }
        });
    }
}

export default CheckPermissionsAndEnabled
