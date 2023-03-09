import { Pool } from "pg";

const pool: Pool = new Pool();

module.exports = {
    async query(text: string,params: any[]) {
        const res = await pool.query(text, params);
        return res;
    },
    async getClient(query: string, params?: any[]) {
        const client = await pool.connect();

        try{
            await client.query('BEGIN')
            const res = await client.query(query, params);
            await client.query('COMMIT');
            return res;
        } catch(error: any) {
            await client.query('ROLLBACK');
            console.log(error.message);
            return error;
        } finally {
            client.release();
        }
    },
}