import createDatabaseConnection from '../config/database';

createDatabaseConnection().then(async connection => {
  await connection.runMigrations();
});
