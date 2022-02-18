import { MysqlError, Pool } from 'mysql';
import { DatabaseReturnValue, IWhereItem } from '../../../types/Database';
import Command from '../connection/Command';


const Post = <T>(table: string, databaseConnection: Pool, data: IWhereItem[] = []): Promise<MysqlError | DatabaseReturnValue<T>> => {
    let keys = '';
    let values = '';

    data.forEach((item) => {
        let value = item.value;
        if (typeof value === 'string') {
            value = value.replace(/'/g, '&#39;');
        }

        if (keys === '') {
            keys += `\`${item.key}\``;
            values += `'${value}'`;
        } else {
            keys += `, \`${item.key}\``;
            values += `, '${value}'`;
        }
    });

    return Command<T>(
        `INSERT INTO ${table}(${keys})
         VALUES (${values})`,
        databaseConnection,
    );
};

export default Post;
