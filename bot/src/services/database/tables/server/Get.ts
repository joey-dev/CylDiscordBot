import { Pool } from 'mysql';
import { DatabaseReturnValue, IServer } from '../../../../types/Database';
import Requests from '../../requests/Requests';


const Get = async (server_id: string, databaseConnection: Pool) => {
    return await Requests.Get<IServer>('server', databaseConnection, [{key: 'server_id', value: server_id}]);
};

export default Get;
