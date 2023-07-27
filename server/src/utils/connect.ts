import { Sequelize } from 'sequelize';
import config from 'config';
import logger from './logger'

const user = config.get<string>('username')
const pass = config.get<string>('password')
const db = config.get<string>('database')

const sequelize = new Sequelize(db, user, pass, {
    host: 'localhost',
    dialect: 'mysql',
    logging: msg => logger.debug(msg),
});

export default sequelize;