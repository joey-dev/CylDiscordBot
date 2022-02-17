import { MysqlError, Pool } from 'mysql';
import { DatabaseReturnValue, IDatabaseDeleteSuccess } from '../../../../types/Database';
import Requests from '../../requests/Requests';


const Delete = (serverId: string, databaseConnection: Pool): Promise<(MysqlError | DatabaseReturnValue<IDatabaseDeleteSuccess>)[]> => {
    const data = [
        {
            key: 'server_id',
            value: serverId,
        },
    ];

    return Promise.all([
        Requests.Delete<IDatabaseDeleteSuccess>('user_server', databaseConnection, data),
        Requests.Delete<IDatabaseDeleteSuccess>('server', databaseConnection, data),
    ]);
};

export default Delete;
