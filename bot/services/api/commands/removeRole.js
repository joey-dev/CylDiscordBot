import ApiRequest from '../apiRequest.js';

class RemoveRole {
    static command(commandName, roleName, roleId, serverId, callback) {
        ApiRequest.patch(serverId, "commands/role/remove/" + commandName, (response) => {
            callback(response.success);
        }, {
            "roleName": roleName,
            "roleId": roleId
        });
    }
}

export default RemoveRole
