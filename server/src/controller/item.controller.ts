import { Request, Response } from 'express';
import { CreateItemInput, GetItemInput } from '../schema/item.schema';
import { createItem, deleteItem, getItem, getItemAndUpdate, getSingleItem } from '../service/item.service';

export async function createItemHandler(req: Request<{}, {}, CreateItemInput['body']>, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const body = req.body;

    const item = await createItem({ ...body, user_id: user });

    return res.send(item);
}

export async function getItemsHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const item = await getItem(user);

    return res.send(item);
}

export async function getSingleItemHandler(req: Request<GetItemInput['params']>, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const item_id = req.params.itemId;

    const item = await getSingleItem(user, item_id);

    return res.send(item);
}

export async function updateItemHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const item_id = req.params.itemId;

    const { update } = req.body;

    const item = await getItemAndUpdate(user, item_id, update);

    return res.send(item);
}

export async function deleteItemHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const item_id = req.params.itemId;

    const item = await deleteItem(user, item_id);

    return res.sendStatus(200).send(item);
}
