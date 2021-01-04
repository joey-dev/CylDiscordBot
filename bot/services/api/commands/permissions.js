import ApiRequest from '../apiRequest.js';

class Permissions {
    static fromMessage(message, commandName, callback) {
        const roleIds = message.member.roles.cache.map(role => {
            return role.id
        });

        ApiRequest.post(message.guild.id, "commands/permissions/" + commandName, (response) => {
            callback(response.gotPermissions);
        }, {"roleIds": roleIds});
    }
}

export default Permissions
