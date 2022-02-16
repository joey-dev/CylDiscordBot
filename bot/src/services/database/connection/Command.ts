import { MysqlError, Pool } from 'mysql';
import { DatabaseReturnValue } from '../../../types/Database';

const Command = <T>(sql: string, databaseConnection: Pool): Promise<MysqlError | DatabaseReturnValue<T>> => {
    return new Promise((resolve, reject) => {
        databaseConnection.getConnection((error, connection) => {
            if (error) {
                reject(error);
            }

            connection.query(sql, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        results
                    });
                }
            });

            connection.release();
        });
    })
};

export default Command;
