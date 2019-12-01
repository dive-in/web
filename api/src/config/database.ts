import { createConnection, Connection } from 'typeorm';

const createDatabaseConnection = async (): Promise<Connection> => {
  const connection = await createConnection();

  return connection;
};

export default createDatabaseConnection;
