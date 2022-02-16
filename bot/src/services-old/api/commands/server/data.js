import ApiRequest from '../../apiRequest.js';

export class Data {
    static get(serverId, callback) {
        ApiRequest.get(serverId, "servers/this", (response) => {
            callback(response);
        })
    }
}

export default Data
