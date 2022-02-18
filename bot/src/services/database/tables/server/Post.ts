import { MysqlError, Pool } from 'mysql';
import { DatabaseReturnValue } from '../../../../types/Database';
import Requests from '../../requests/Requests';

const Post = <T>(serverId: string, name: string, databaseConnection: Pool): Promise<MysqlError | DatabaseReturnValue<T>> => {
    return Requests.Post('server', databaseConnection, [
        {
            key: 'server_id',
            value: serverId,
        }, {
            key: 'name',
            value: name,
        }, {
            key: 'command_prefix',
            value: '!',
        }, {
            key: 'language_id',
            value: 1,
        },
    ]);
};

export default Post;
