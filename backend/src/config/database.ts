import { env } from './env.js'
import { Pool } from 'pg';

// configuracion de la base de datos 
const pool = new Pool ({
    password: env?.DB_PASSWORD,
    port: env?.DB_PORT,
    database: env?.DB_NAME,
    user: env?.DB_USER,
    host: env?.DB_HOST
});

export default pool;
