import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    NonAttribute,
} from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    Table,
    CreatedAt,
    UpdatedAt,
    AutoIncrement,
    HasMany,
    BelongsToMany,
    NotNull, //@ts-expect-error
} from '@sequelize/core/decorators-legacy';
import { Stock } from './stock.model';
import Category from './category.model';

@Table({
    tableName: 'product',
    timestamps: true,
    freezeTableNames: true,
    underscored: true,
})
export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    /**
     * PK
     */
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare product_id: CreationOptional<number>;

    /**
     * Attributes
     */
    @Attribute(DataTypes.STRING)
    @NotNull
    declare name: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare description: string;

    @Attribute(DataTypes.FLOAT)
    @NotNull
    declare price: number;

    @Attribute(DataTypes.FLOAT)
    @NotNull
    declare price_per_unit: number;

    @Attribute(DataTypes.DATE)
    @CreatedAt
    declare createdAt: CreationOptional<Date>;

    @Attribute(DataTypes.DATE)
    @UpdatedAt
    declare updatedAt: CreationOptional<Date>;

    /**
     * Associations
     */
    @HasMany(() => Stock, 'product_id')
    declare stock: Stock[];

    @BelongsToMany(() => Category, {
        through: 'product_category',
    })
    declare product_category_id?: NonAttribute<Category[]>;
}

export default Product;
