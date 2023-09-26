import Product, { ProductCreationAttributes } from '../models/product.model';

export async function createProduct(input: ProductCreationAttributes) {
    try {
        const newProduct = await Product.create(input);
        return newProduct;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getProducts(input: any) {
    try {
        const products = await Product.findAll({
            where: {
                user_id: input,
            },
        });

        return products;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getSinglepProduct(input: any) {
    const { user, product_id } = input;
    try {
        const product = await Product.findOne({
            where: {
                id: product_id,
                user_id: user,
            },
        });

        return product;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getProductAndUpdate(input: any) {
    const { user, product_id, body } = input;

    const product = await Product.findOne({
        where: { user_id: user, id: product_id },
    });

    if (!product) {
        return false;
    }

    try {
        await product.update(body);
        return true;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteProduct(user_id: string, product_id: string) {
    const product = await Product.findOne({
        where: {
            user_id: user_id,
            id: product_id,
        },
    });

    if (!product) {
        return false;
    }

    product.destroy();

    return true;
}
