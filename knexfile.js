// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "devDB/database.sqlite");

export default {
  development: {
    client: "sqlite3",
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true,
  },
  production: {
    client: "pg",
    connection: process.env.POSTGRES_URL,
    // connection: 'postgres://dcivrpph:TimKpiXsSeDC_tGgn0MZbonD7QCKatmY@ruby.db.elephantsql.com/dcivrpph',
    // connection: {
    //   // host: '',
    //   // database: 'my_db',
    //   // user: 'username',
    //   // password: 'password',
    //   connectionString: process.env.POSTGRES_URL,
    // },
    pool: {
      min: 2,
      // max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
