import ApiRequest from '../apiRequest.js';

class Enabled {
    static command(commandName, serverId, callback) {
        ApiRequest.get(serverId, "commands/enabled/" + commandName, (response) => {
            callback(response.enabled);
        });
    }
}

export default Enabled
