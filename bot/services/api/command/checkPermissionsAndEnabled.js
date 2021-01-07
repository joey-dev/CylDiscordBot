import Command from './command';
import Enabled from './enabled.js';
import Permissions from './permissions.js';

class CheckPermissionsAndEnabled {
    static command(commandName, member, callback) {
        Enabled.command(commandName, member.guild.id, (isEnabled) => {
            if (isEnabled) {
                Command.memberHasPermissions(commandName, member, (gotPermissions) => {
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
