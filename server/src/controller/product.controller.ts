import { Request, Response } from 'express';
import { CreateProductInput, GetProductInput } from '../schema/product.schema';
import { createProduct, deleteProduct, getProduct, getProductAndUpdate, getSingleProduct } from '../service/product.service';

export async function createProductHandler(req: Request<{}, {}, CreateProductInput['body']>, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const body = req.body;

    const product = await createProduct({ ...body, user_id: user });

    return res.send(product);
}

export async function getProductsHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const product = await getProduct(user);

    return res.send(product);
}

export async function getSingleProductHandler(req: Request<GetProductInput['params']>, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

   

    const product = await getSingleProduct(user);

    return res.send(product);
}

export async function updateProductHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }



    const { update } = req.body;

    const product = await getProductAndUpdate(user);

    return res.send(product);
}

export async function deleteProductHandler(req: Request, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }


    const product = await deleteProduct(user);

    return res.sendStatus(200).send(product);
}
