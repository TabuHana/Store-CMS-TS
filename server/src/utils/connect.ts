import { Sequelize, importModels } from '@sequelize/core';
import config from 'config';
import logger from './logger';

// Models
import { Category, Color, Item, Order, Session, Stock, User } from '../models/index.model';

const user = config.get<string>('username');
const pass = config.get<string>('password');
const dbPort = config.get<number>('dbport');
const host = config.get<string>('host');
const dbName = config.get<string>('database');

export const sequelize = new Sequelize({
    database: dbName,
    username: user,
    password: pass,
    host: host,
    port: dbPort,
    dialect: 'mysql',
    logging: (msg) => logger.debug(msg),
    models: [Category, Color, Item, Order, Session, Stock, User],
});

async function connect() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        logger.info('Connection has been established successfully.');
    } catch (error: any) {
        logger.info('Unable to connect to the database:', error);
    }
}

export default connect;
