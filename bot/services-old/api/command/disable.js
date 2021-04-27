import ApiRequest from '../apiRequest.js';

class Disable {
    static command(commandName, serverId, callback) {
        ApiRequest.patch(serverId, "commands/status/" + commandName + "/disabled", (response) => {
            callback(response.enabled);
        });
    }
}

export default Disable;
