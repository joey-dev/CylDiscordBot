import Enabled from './enabled.js';
import Permissions from './permissions.js';

class CheckPermissionsAndEnabled {
    static command(commandName, message, callback) {
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

    static check(commandName, message, callback) {
        return this.command(commandName, message, callback);
    }
}

export default CheckPermissionsAndEnabled
