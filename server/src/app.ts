// Dep
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';

// Files
import routes from './routes';

// Utils
import logger from './utils/logger';
import sequelize from './sequelize';

// Testing
import User from './models/user.model';
import Order from './models/order.model';
import Item from './models/item.model';
import OrderedItems from './models/orderedItems.model';
import Stock from './models/stock.model';
import Color from './models/color.model';

const port = config.get<number>('port');

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    console.log('node in production');
}

app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`);
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        logger.info('Connection has been established successfully.');
        console.log(User === sequelize.models.User);
        console.log(Order === sequelize.models.Order);
        console.log(Item === sequelize.models.Item);
        console.log(OrderedItems === sequelize.models.OrderedItems);
        console.log(Stock === sequelize.models.Stock);
        console.log(Color === sequelize.models.Color);
    } catch (error) {
        logger.info('Unable to connect to the database:', error);
    }
    routes(app);
});
