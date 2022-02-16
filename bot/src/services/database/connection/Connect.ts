import { createPool, Pool, PoolConfig } from 'mysql';


export const ConnectDatabase = async (poolConfig: PoolConfig): Promise<Pool> => {
    const pool = createPool(poolConfig);

    await pool.getConnection((error, connection) => {
        if (error) throw error;
        console.log('Connection to the database has been successful!');
        connection.release();
    });

    return pool;
};
