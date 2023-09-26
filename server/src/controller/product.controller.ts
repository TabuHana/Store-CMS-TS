import { Request, Response } from 'express';
import { createProduct, deleteProduct, getProductAndUpdate, getProducts } from '../service/product.service';
import { CreateProductInput, GetProductInput, UpdateProductInput } from '../schema/product.schema';

export async function createProductHandler(req: Request<{}, {}, CreateProductInput['body']>, res: Response) {
    try {
        const user: string = res.locals.user.user_id;

        if (!user) {
            return res.status(401).send({ message: 'Login Required' });
        }

        const body = req.body;

        const product = await createProduct({ ...body, user_id: user });

        return res.send(product);
    } catch (error: any) {
        if (error.message === 'SequelizeUniqueConstraintError: Validation error') {
            return res.status(409).send({ message: 'Email in use' });
        } else {
            return res.status(500).send({ message: `Server Error: ${error.message}` });
        }
    }
}

export async function getProductsHandler(req: Request, res: Response) {
    try {
        const user: string = res.locals.user.user_id;

        if (!user) {
            return res.status(401).send({ message: 'Login Required' });
        }
        const products = await getProducts(user);

        return res.send(products);
    } catch (error: any) {
        return res.status(500).send({ message: `Server Error ${error.message}` });
    }
}

export async function updateProductHandler(
    req: Request<UpdateProductInput['params'], {}, UpdateProductInput['body']>,
    res: Response
) {
    try {
        const user: string = res.locals.user.user_id;

        if (!user) {
            return res.status(401).send({ message: 'Login Required' });
        }

        const product_id = req.params.productId;

        const body = req.body;
        const product = await getProductAndUpdate({ user, product_id, body });

        return res.send(product);
    } catch (error: any) {
        return res.status(500).send({ message: `Server Error ${error.message}` });
    }
}

export async function deleteProductHandler(req: Request<GetProductInput['params']>, res: Response) {
    try {
        const user: string = res.locals.user.user_id;

        if (!user) {
            return res.status(401).send({ message: 'Login Required' });
        }

        const product_id = req.params.productId;

        await deleteProduct(user, product_id);

        return res.sendStatus(200);
    } catch (error: any) {
        return res.status(500).send({ message: `Server Error ${error.message}` });
    }
}

// random, working in branch