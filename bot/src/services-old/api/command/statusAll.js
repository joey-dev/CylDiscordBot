import ApiRequest from '../apiRequest.js';

class StatusAll {
    static command(serverId, callback) {
        ApiRequest.get(serverId, "commands/status", (statusAll) => {
            callback(statusAll)
        });
    }
}

export default StatusAll
