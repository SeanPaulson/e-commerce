import { PoolClient } from "pg";

const { Pool } = require('pg');

const pool: PoolClient = new Pool();

module.exports = {
    query: (text: string,params: any[], callback: any) => {
        return pool.query(text, params, callback);
    }
}