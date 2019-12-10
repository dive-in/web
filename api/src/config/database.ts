import {
  createConnection,
  Connection,
  useContainer as ormUseContainer,
} from 'typeorm';
import { Container } from 'typedi';

ormUseContainer(Container);
const createDatabaseConnection = async (): Promise<Connection> => {
  const connection = await createConnection();

  return connection;
};

export default createDatabaseConnection;
