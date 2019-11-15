import { createConnection, Connection } from 'typeorm';

const createDatabaseConnection = async (): Promise<Connection> => {
  const connection = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['entities/*.ts'],
    migrations: ['migrations/*.ts'],
    cli: {
      migrationsDir: 'migration',
    },
  });

  return connection;
};

export default createDatabaseConnection;
