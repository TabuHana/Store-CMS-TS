import { Sequelize } from 'sequelize-typescript';
import config from 'config';
import logger from './utils/logger';

import User from './models/user.model';
import Order from './models/order.model';
import Item from './models/item.model';
import OrderedItems from './models/orderedItems.model';
import Stock from './models/stock.model';
import Color from './models/color.model';

const user = config.get<string>('username');
const pass = config.get<string>('password');
const db = config.get<string>('database');

const sequelize = new Sequelize(db, user, pass, {
    dialect: 'mysql',
    logging: (msg) => logger.debug(msg),
    // models: [__dirname + '/models'],
    models: [User, Order, Item, OrderedItems, Stock, Color],
});

export default sequelize;
