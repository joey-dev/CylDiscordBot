import { Pool } from 'mysql';
import { IWhereItem } from '../../../types/Database';
import Command from '../connection/Command';



const Get = async <T>(table: string, databaseConnection: Pool, data: IWhereItem[] = []) => {
    let where = '';

    if (data.length > 0) {
        where = 'where';
        data.forEach((item) => {
            where += ' ' + item.key + '=' + item.value;
        });
    }

    return await Command<T>(`select * from ${table} ${where}`, databaseConnection);
};

export default Get;
