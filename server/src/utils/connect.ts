import { Sequelize } from 'sequelize-typescript';
import config from 'config';
import logger from './logger';

import User from '../models/user.model';

const user = config.get<string>('username');
const pass = config.get<string>('password');
const db = config.get<string>('database');

const sequelize = new Sequelize(db, user, pass, {
    dialect: 'mysql',
    logging: (msg) => logger.debug(msg),
    models: [User],
});

export default sequelize;
