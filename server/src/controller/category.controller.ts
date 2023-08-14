import { Request, Response } from 'express';
import { createCategory, deleteCategory, getCategory, getCategoryAndUpdate } from '../service/category.service';
import { CreateCategoryInput, DeleteCategoryInput, UpdateCategoryInput } from '../schema/category.schema';

export async function createCategoryHandler(req: Request<{}, {}, CreateCategoryInput['body']>, res: Response) {
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

export async function updateCategoryHandler(
    req: Request<UpdateCategoryInput['params'], {}, UpdateCategoryInput['body']>,
    res: Response
) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const category_id = req.params.categoryId;

    const body = req.body;

    const category = await getCategoryAndUpdate({ category_id, body });

    return res.send(category);
}

export async function deleteCategoryHandler(req: Request<DeleteCategoryInput['params']>, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const category_id = req.params.categoryId;

    await deleteCategory(category_id);

    return res.sendStatus(200);
}
