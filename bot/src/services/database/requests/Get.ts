import { MysqlError, Pool } from 'mysql';
import { DatabaseReturnValue, IWhereItem } from '../../../types/Database';
import Command from '../connection/Command';


const Get = <T>(table: string, databaseConnection: Pool, data: IWhereItem[] = []): Promise<MysqlError | DatabaseReturnValue<T>> => {
    let where = '';

    if (data.length > 0) {
        where = 'where';
        data.forEach((item) => {
            where += ` ${item.key}=${item.value}`;
        });
    }

    return Command<T>(`select * from ${table} ${where}`, databaseConnection);
};

export default Get;
