import ApiRequest from '../apiRequest.js';

class AddRole {
    static command(commandName, roleName, roleId, serverId, callback) {
        ApiRequest.patch(serverId, "commands/role/add/" + commandName, (response) => {
            callback(response.success);
        }, {
            "roleName": roleName,
            "roleId": roleId
        });
    }
}

export default AddRole
