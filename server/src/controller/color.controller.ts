import { Request, Response } from 'express';
import { CreateColorInput, GetColorInput } from '../schema/color.schema';

export async function createColorHandler(req: Request<{}, {}, CreateColorInput['body']>, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const body = req.body;

    const color = await createColor({ ...body, user_id: user });

    return res.send(color);
}

export async function getColorsHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const color = await getColor(user);

    return res.send(color);
}

export async function getSingleColorHandler(req: Request<GetColorInput['params']>, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const color_id = req.params.colorId;

    const color = await getSingleColor(user, color_id);

    return res.send(color);
}

export async function updateColorHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const color_id = req.params.colorId;

    const { update } = req.body;

    const color = await getColorAndUpdate(user, color_id, update);

    return res.send(color);
}

export async function deleteColorHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const color_id = req.params.colorId;

    const color = await deleteColor(user, color_id);

    return res.sendStatus(200).send(color);
}
