import ApiRequest from '../../apiRequest.js';

export class Data {
    static command(serverId, callback) {
        ApiRequest.get(serverId, "welcome/", (response) => {
            callback(response);
        });
    }

    static getWelcomeData(serverId, callback) {
        this.command(serverId, callback);
    }
}

export default Data;
