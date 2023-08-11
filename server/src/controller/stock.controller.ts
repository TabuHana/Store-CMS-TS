import { Request, Response } from 'express';
import { CreateStockInput, GetStockInput } from '../schema/stock.schema';
import { createStock, deleteStock, getSingleStock, getStock, getStockAndUpdate } from '../service/stock.service';

export async function createStockHandler(req: Request, res: Response) {
    const user: string = res.locals.user;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const body = req.body;

    const stock = await createStock({ ...body });

    return res.send(stock);
}

export async function getStocksHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const stocks = await getStock(user);

    return res.send(stocks);
}

export async function getSingleStockHandler(req: Request<GetStockInput['params']>, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }


    const stock = await getSingleStock(user);

    return res.send(stock);
}

export async function updateStockHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }


    const stock = await getStockAndUpdate(user);

    return res.send(stock);
}

export async function deleteStockHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }


    const stock = await deleteStock(user);

    return res.sendStatus(200).send(stock);
}
