import dotenv from 'dotenv';
dotenv.config();
import pkg from 'pg';

const {Pool} = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = {
    query: (text, params) => pool.query(text, params),
  };
  
export default db;