import {Data as DataApi} from "../../../services/api/server/data.js";

class Data {
    static command(message, args, client) {
        const serverId = message.guild.id;

        DataApi.get(serverId, (data) => {
            message.reply("\nServername: " + data.name + "\nServerId: " + data.serverId);
        })
    }
}

export default Data;
