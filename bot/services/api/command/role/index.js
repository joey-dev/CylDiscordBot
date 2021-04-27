import { Add } from './add.js';

export class Index {
    static add(commandName, roleName, roleId, serverId, callback) {
        Add.run(commandName, roleName, roleId, serverId, callback);
    }
}
