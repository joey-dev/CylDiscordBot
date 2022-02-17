import { MysqlError, Pool } from 'mysql';
import { DatabaseReturnValue, IWhereItem } from '../../../types/Database';
import Command from '../connection/Command';


const Delete = async <T>(table: string, databaseConnection: Pool, data: IWhereItem[] = []): Promise<MysqlError | DatabaseReturnValue<T>> => {
    let where = '';

    if (data.length > 0) {
        where = 'where';
        data.forEach((item) => {
            where += ` ${item.key}=${item.value}`;
        });
    }

    return Command<T>(`DELETE
                       FROM ${table} ${where}`, databaseConnection);
};

export default Delete;
