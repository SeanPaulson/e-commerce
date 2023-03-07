import { PoolClient } from "pg";

const { Pool } = require('pg');

const pool: PoolClient = new Pool();

module.exports = {
    async query(text: string,params: any[]) {
        const res = await pool.query(text, params);
        return res;
    }
}