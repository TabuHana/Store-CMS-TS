import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, BelongsToManyGetAssociationsMixin, BelongsToManySetAssociationsMixin } from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    Table,
    AutoIncrement, //@ts-expect-error
} from '@sequelize/core/decorators-legacy';
import Product from './product.model';

@Table({
    tableName: 'category',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
})
export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
    /**
     * PK
     */
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare category_id: CreationOptional<number>;

    /**
     * Attribute
     */
    @Attribute(DataTypes.STRING)
    declare name: string;

    // Associations
    declare getProducts: BelongsToManyGetAssociationsMixin<Product>

    declare setProducts: BelongsToManySetAssociationsMixin<Product, Product['product_id']>
}

export default Category;
