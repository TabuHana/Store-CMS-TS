import { Request, Response } from 'express';
import { createCategory, deleteCategory, getCategory, getCategoryAndUpdate, getSingleCategory } from '../service/category.service';

export async function createCategoryHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const body = req.body;

    const category = await createCategory({ ...body, user_id: user });

    return res.send(category);
}

export async function getCategorysHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const category = await getCategory(user);

    return res.send(category);
}

export async function getSingleCategoryHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const category_id = req.params.categoryId;

    const category = await getSingleCategory(user);

    return res.send(category);
}

export async function updateCategoryHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const category_id = req.params.categoryId;

    const { update } = req.body;

    const category = await getCategoryAndUpdate(user);

    return res.send(category);
}

export async function deleteCategoryHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const category_id = req.params.categoryId;

    const category = await deleteCategory(user);

    return res.sendStatus(200).send(category);
}
