import Category from '../models/category.model';

export async function createCategory(input: any) {
    try {
        const newCategory = await Category.create(input);
        return newCategory;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getCategory(input: any) {
    try {
        const categories = await Category.findAll({
            include: {
                association: 'Products',
            },
        });

        return categories;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updateCategoryName(input: any) {
    const { category_id, body } = input;

    const updatedCategory = await Category.findByPk(category_id);

    if (!updatedCategory) {
        return false;
    }

    try {
        await updatedCategory.update(body);
        return true;
    } catch (error: any) {
        console.log(error);
        return false;
    }
}

export async function updateCategoryProducts(input: any) {
    const { category_id } = input;

    const updatedCategory = await Category.findByPk(category_id);

    if (!updatedCategory) {
        return false;
    }

    try {
        const categoryProducts = await updatedCategory.getProducts();
        return categoryProducts;
    } catch (error: any) {
        console.log(error);
        return false;
    }
}

export async function deleteCategory(input: any) {


    const category = await Category.findByPk(input);

    if (!category) {
        return false;
    }

    category.destroy();

    return true;
}
