import ApiRequest from '../apiRequest.js';

class Permissions {
    static command(member, commandName, callback) {
        const roleIds = member.roles.cache.map(role => {
            return role.id
        });

        ApiRequest.post(member.guild.id, "commands/permissions/" + commandName, (response) => {
            callback(response.gotPermissions);
        }, {"roleIds": roleIds});
    }

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
