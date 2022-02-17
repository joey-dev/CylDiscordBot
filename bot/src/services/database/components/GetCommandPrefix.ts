import { Pool } from 'mysql';
import { DatabaseReturnValue, IServer } from '../../../types/Database';
import Server from '../tables/server/Server';



const GetCommandPrefix = async (serverId: string, databaseConnection: Pool): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            const server = await Server.get(serverId, databaseConnection) as DatabaseReturnValue<IServer>;
            if (server.results[0].command_prefix) {
                resolve(server.results[0].command_prefix);
            } else {
                reject('no command_prefix found');
            }
        } catch (error) {
            reject(error);
        }
    });
};

export default GetCommandPrefix;
