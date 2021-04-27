import ApiRequest from '../../apiRequest.js';

export class Add {
    static run(commandName, roleName, roleId, serverId, callback) {
        ApiRequest.patch(serverId, "commands/role/add/" + commandName, (response) => {
            callback(response.success);
        }, {
            "roleName": roleName,
            "roleId": roleId
        });
    }
}
