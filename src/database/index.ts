import { Pool } from "pg";

import config from "../config";

const pool = new Pool({
   host: config.host,
   database: config.database,
   user: config.user,
   password: config.password,
   port: config.dbPort as unknown as number,
});

pool.on("error", (err: Error) => {
   console.log(`Error: ${err}`);
});

export default pool;
