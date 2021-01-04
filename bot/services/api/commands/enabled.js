import ApiRequest from '../apiRequest.js';

class Enabled {
    static command(name, serverId, callback) {
        ApiRequest.get(serverId, "commands/enabled/" + name, (response) => {
            callback(response.enabled);
        });
    }
}

export default Enabled
