import ApiRequest from '../apiRequest.js';

export class Data {
    static getWelcomeData(serverId, callback) {
        ApiRequest.get(serverId, "welcome/", (response) => {
            callback(response);
        });
    }
}

export default Data;
