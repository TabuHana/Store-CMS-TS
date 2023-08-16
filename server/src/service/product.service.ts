import Category from '../models/category.model';
import Product from '../models/product.model';

export async function createProduct(input: any) {
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
            where: { user_id: input },
            include: { association: 'product_category_id' },
        });
        return products;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getSingleProduct(input: any) {
    const { user, product_id } = input;

    const product = await Product.findOne({
        where: {
            product_id: product_id,
            user_id: user,
        },
        include: { association: 'product_category_id' },
    });

    if (!product) {
        return false;
    }

    return product;
}

export async function getProductAndUpdate(input: any) {
    const { body, product_id, user } = input;

    const product = await Product.findOne({
        where: {
            product_id: product_id,
            user_id: user,
        },
        include: { association: 'product_category_id' },
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

export async function deleteProduct(input: any) {
    const { user, product_id } = input;

    const product = await Product.findOne({
        where: {
            user_id: user,
            product_id: product_id,
        },
    });

    if (!product) {
        return false;
    }

    product.destroy();

    return true;
}
