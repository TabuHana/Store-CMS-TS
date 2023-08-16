import { Request, Response } from 'express';
import { CreateProductInput, DeleteProductInput, GetProductInput, UpdateProductInput } from '../schema/product.schema';
import {
    createProduct,
    deleteProduct,
    getProducts,
    getProductAndUpdate,
    getSingleProduct,
} from '../service/product.service';

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

    const products = await getProducts(user);

    return res.send(products);
}

export async function getSingleProductHandler(req: Request<GetProductInput['params']>, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const product_id = req.params.productId;

    const product = await getSingleProduct({ user, product_id });

    return res.send(product);
}

export async function updateProductHandler(
    req: Request<UpdateProductInput['params'], {}, UpdateProductInput['body']>,
    res: Response
) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const product_id = req.params.productId;

    const body = req.body;

    const product = await getProductAndUpdate({ body, product_id, user });

    return res.send(product);
}

export async function deleteProductHandler(req: Request<DeleteProductInput['params']>, res: Response) {
    const user: string = res.locals.user.user_id;

    if (!user) {
        return res.status(401).send({ status: 'Failure', message: 'You must be logged in!' });
    }

    const product_id = req.params.productId;

    await deleteProduct({ user, product_id });

    return res.sendStatus(200);
}
