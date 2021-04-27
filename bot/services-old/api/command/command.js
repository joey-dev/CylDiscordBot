import CheckPermissionsAndEnabled from './checkPermissionsAndEnabled.js';
import Enabled from './enabled.js';
import Permissions from './permissions.js';

class Command {
    static isEnabled(commandName, serverId, callback) {
        return Enabled.command(commandName, serverId, callback);
    }

    static memberHasPermissions(commandName, member, callback) {
        return Permissions.command(member, commandName, callback);
    }

    static isEnabledAndMemberHasPermissions(commandName, member, callback) {
        return CheckPermissionsAndEnabled.command(commandName, member, callback);
    }
}

export default Command;
