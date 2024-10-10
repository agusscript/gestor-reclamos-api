import { createPool } from 'mysql2/promise';

const databaseConnection = createPool({
  host: 'localhost',
  user: 'tp-user',
  password: 'tp-password',
  database: 'tp-database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default databaseConnection;