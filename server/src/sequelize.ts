import { Sequelize } from 'sequelize-typescript';
import config from 'config';
import logger from './utils/logger';



const user = config.get<string>('username');
const pass = config.get<string>('password');
const dbPort = config.get<number>('dbport')
const host = config.get<string>('host')
const dbName = config.get<string>('database')

const sequelize = new Sequelize({
    database: dbName,
    username: user,
    password: pass,
    host: host,
    port: dbPort,
    dialect: 'mysql',
    models: [__dirname + '/models'],
    logging: msg => logger.debug(msg)
});

export default sequelize;
