import { MysqlError, Pool } from 'mysql';
import { DatabaseReturnValue, IServer } from '../../../../types/Database';
import Requests from '../../requests/Requests';


const Get = async (serverId: string, databaseConnection: Pool): Promise<MysqlError | DatabaseReturnValue<IServer>> => {
    return Requests.Get<IServer>('server', databaseConnection, [{key: 'server_id', value: serverId}]);
};

export default Get;
