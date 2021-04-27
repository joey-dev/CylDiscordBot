import ApiRequest from '../apiRequest.js';

class Enable {
    static command(commandName, serverId, callback) {
        ApiRequest.patch(serverId, "commands/status/" + commandName + "/enabled", (response) => {
            callback(response.enabled);
        });
    }
}

export default Enable;
